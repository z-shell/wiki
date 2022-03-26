---
id: zsh_handbook
title: Zsh Native Scripting Handbook
---

## Information

### @ is about keeping array form

How to access all array elements in a shell? The standard answer: `use @ subscript`, i.e. `${array[@]}`. However, this
is the Bash & Ksh way (and with the option `KSH_ARRAYS`, Zsh also works this way, i.e. needs `@` to access the whole
array). Z shell **is different**: it is `$array` that refers to all elements anyway. There is no need for the `@`
subscript.

So what use has `@` in the Zsh-world? It is: "`keep array form`" or "`do not join`". When is it activated? When the user
quotes the array, i.e. invokes `"$array"`, he induces _joining_ of all array elements (into a single string). `@` is to
have elements still quoted (so empty elements are preserved), but not joined.

Two forms are available, `"$array[@]"` and `"${(@)array}"`. The first form has an additional effect – when an option
`KSH_ARRAYS` is set, it indeed induces referencing to the whole array instead of a first element only. It should then
use braces, i.e. `${array[@]}`, `"${array[@]}"` (`KSH_ARRAYS` requirement).

In practice, if you'll use `@` as a subscript – `[@]`, not as a flag – `${(@)...}`, then you'll make the code
`KSH_ARRAYS`-compatible.

### extended_glob

Glob-flags `#b` and `#m` require `setopt extended_glob`. Patterns utilizing `~` and `^` also require it. Extended-glob
is one of the main features of Zsh.

## Constructs

### Reading a file

```shell
declare -a lines; lines=( "${(@f)"$(<path/file)"}" )
```

This preserves empty lines because of double-quoting (the outside one). `@`-flag is used to obtain an array instead of a
scalar. If you don't want empty lines preserved, you can also skip `@`-splitting, as is explained in the
[Information](#information) section:

```shell
declare -a lines; lines=( ${(f)"$(<path/file)"} )
```

Note: `$(<...)` construct strips trailing empty lines.

### Reading from stdin

This topic is governed by the same principles a the previous paragraph (`Reading a file`), with the single difference
that instead of the substitution `"$(<file-path)"` the substitution that should be used is `"$(command arg1 ...)"`,
i.e.:

```shell
declare -a lines; lines=( ${(f)"$(command arg1 ...)"} )
```

This will read the `command's` output into the array `lines`. The version that does `@` splitting and retains any empty
lines are:

```shell
declare -a lines; lines=( "${(f@)$(command arg1 ...)}" )
```

Note that instead of four double-quotes `"`, an idiom that is justified (simply suggested) by the Zsh documentation (and
was used in the previous paragraph, in the snippet `... "${(@f)"$(<path/file)"}" ...`), only **two** double-quotes are
being used. I've investigated this form with the main Zsh developers on the `zsh-workers@zsh.org` mailing list and it
was clearly stated that single, outside quoting of `${(f@)...}` substitution works as if it was also separately applied
to `$(command ...)` (or to `$(<file-path)`) inner substitution, so the second double-quoting isn't needed.

### Skipping dirname basename

`dirname` and `basename` can be skipped by:

```shell
local dirname="${PWD:h}"
local basename="${PWD:t}"
```

Read more: [zsh: 14 Expansion](http://zsh.sourceforge.net/Doc/Release/Expansion.html#Modifiers).

### Resolve Symlinks

Symbolic links can be turned into an absolute path with:

```shell
local absolute_path="${PWD:A}"
```

### Skipping grep

```shell
declare -a lines; lines=( "${(@f)"$(<path/file)"}" )
declare -a grepped; grepped=( ${(M)lines:#*query*} )
```

To have the `grep -v` effect, skip the `M`-flag. To grep case-insensitively, use `\#i` glob flag (`...:#(#i)\*query*}`).

As it can be seen, `${...:#...}` substitution is filtering of the array, which by default filters-out elements (`(M)`
flag induces the opposite behavior). When used with string, not an array, it behaves similarly: returns an empty string
when `{input_string_var:#pattern}` matches the whole input string.

Side-note: `(M)` flag can be used also with `${(M)var#pattern}` and other substitutions, to retain what's matched by the
pattern instead of removing that.

#### Multi-line matching like with grep

Suppose you have a Subversion repository and want to check if it contains files being not under version control. You
could do this in Bash style like follows:

```shell
local svn_status="$(svn status)"
if [[ -n "$(echo "$svn_status" | \grep \^\?)" ]]; then
    echo found
fi
```

Those are 3 forks: for `svn status`, for `echo`, and for `grep`. This can be solved by the `:#` substitution and `(M)`
flag described above in this section (just check if the number of matched lines is greater than 0). However, there's a
more direct approach:

```shell
local svn_status="$(svn status)" nl=$'\n'
if [[ "$svn_status" = *((#s)|$nl)\?* ]]; then
  echo found
fi
```

This requires `extendedglob`. The `(#s)` means: "start of the string". So `((#s)|$nl)` means "start of the string OR
preceded by a new-line".

If the `extendedglob` option cannot be used for some reason, this can be achieved also without it, but essentially it
means that alternative (i.e. `|`) of two versions of the pattern will have to be matched:

```shell
setopt localoptions noextendedglob
local svn_status="$(svn status)" nl=$'\n'
if [[ "$svn_status" = (\?*|*$nl\?*) ]]; then
  echo found
fi
```

In general, multi-line matching falls into the following idiom (`extended glob` version):

```shell
local needle="?" required_preceding='[[:space:]]#'
[[ "$(svn status)" = *((#s)|$nl)${~required_preceding}${needle}* ]] && echo found
```

It does a single fork (calls `svn` status). The `${~variable}` means (the`~` init): "the variable is holding a pattern,
interpret it". All in all, instead of regular expressions we were using patterns (globs) (see
[this section](#built-in-regular-expressions-engine)).

### Pattern matching in AND-fashion

```shell
[[ "abc xyz efg" = *abc*~^*efg* ]] && print Match found
```

The `~` is a negation -- `match \*abc* but not ...`. Then, `^` is also a negation. The effect is:
`\*ABC* but not those that don't have \*efg*` which equals to: `\*ABC* but those that have also \*efg*`. This is a
regular pattern and it can be used with `:#` above to search arrays, or with the `R`-subscript flag to search hashes
(`${hsh[\(R)\*pattern*]}`), etc. The inventor of those patterns is Mikael Magnusson.

### Skipping tr

```shell
declare -A map; map=( a 1 b 2 );
text=( "ab" "ba" )
text=( ${text[@]//(#m)?/${map[$MATCH]}} )
print $text ▶ 12 21
```

`#m` flag enables the `$MATCH` parameter. At each `//` substitution, `$map` is queried for character-replacement. You
can substitute a text variable too, just skip `[@]` and parentheses in the assignment.

### Ternary expressions with `+,-,:+,:-` substitutions

```shell
HELP="yes"; print ${${HELP:+help enabled}:-help disabled} ▶ help enabled
HELP=""; print ${${HELP:+help enabled}:-help disabled} ▶ help disabled
```

Ternary expression is known from `C` language but exists also in Zsh, but directly only in a math context, i.e.
`\(( a = a > 0 ? b : c ))`. The flexibility of Zsh allows such expressions also in a normal context. Above is an
example. `:+` is "if not empty, substitute …" `:-` is "if empty, substitute …". You can save a great number of lines of
code with those substitutions, it's normally at least 4-lines `if` condition or lengthy `&&`/`||` use.

### Ternary expressions with `:#` substitution

```shell
var=abc; print ${${${(M)var:#abc}:+is abc}:-not abc} ▶ is abc
var=abcd; print ${${${(M)var:#abc}:+is abc}:-not abc} ▶ not abc
```

A one-line "if var = x, then …, else …". Again, can spare a great amount of boring code that makes a 10-line function a
20-line one.

[#built-in-regular-expressions-engine]

### Using built-in regular expressions engine

```shell
[[ "aabbb" = (#b)(a##)*(b(#c2,2)) ]] && print ${match[1]}-${match[2]} ▶ aa-bb
```

`\##` is: "1 or more". `(#c2,2)` is: "exactly 2". A few other constructs: `#` is "0 or more", `?` is "any character",
`(a|b|)` is "a or b or empty match". `#b` enables the `$match` parameters. There's also `#m` but it has one parameter
`$MATCH` for whole matched text, not for any parenthesis.

Zsh patterns are a custom regular expressions engine. They are slightly faster than the `zsh/regex` module (used for
`=~` operator) and don't have that dependency (regex module can be not present, e.g. in default static build of Zsh).
Also, they can be used in substitutions, for example in `//` substitution.

### Skipping uniq

```shell
declare -aU array; array=( a a b ); print $array ▶ a b
declare -a array; array=( a a b ); print ${(u)array} ▶ a b
```

Enable `-U` flag for array so that it guards elements to be unique, or use `u`-flag to make unique elements of an array.

### Skipping awk

```shell
declare -a list; list=( "a,b,c,1,e" "p,q,r,2,t" );
print "${list[@]/(#b)([^,]##,)(#c3,3)([^,]##)*/${match[2]}}" ▶ 1 2
```

The pattern specifies 3 blocks of `[^,]##,` so 3 "not-comma multiple times, then comma", then the single block of
"not-comma multiple times" in second parentheses -- and then replaces this with second parentheses. The result is the
4th column extracted from multiple lines of text, something `awk` is often used for. Another method is the use of the
`s`-flag. For a single line of text:

```shell
text="a,b,c,1,e"; print ${${(s:,:)text}[4]} ▶ 1
```

Thanks to in-substitution code-execution capabilities it's possible to use `s`-flag to apply it to multiple lines:

```shell
declare -a list; list=( "a,b,c,1,e" "p,q,r,2,t" );
print "${list[@]/(#m)*/${${(s:,:)MATCH}[4]}}" ▶ 1 2
```

There is a problem with the `(s::)` flag that can be solved if Zsh is version `5.4` or higher: if there will be single
input column, e.g. `list=( "column1" "a,b")` instead of two or more columns (i.e. `list=( "column1,column2" "a,b" )`),
then `(s::)` will return **string** instead of 1-element **array**. So the index `[4]` in the above snippet will index a
string, and show its 4-th letter. Starting with Zsh 5.4, thanks to a patch by Bart Schaefer
(`40640: the (A) parameter flag forces array result even if...`), it is possible to force **array**-kind of result even
for a single column, by adding `(A)` flag, i.e.:

```shell
declare -a list; list=( "a,b,c,1,e" "p,q,r,2,t" "column1" );
print "${list[@]/(#m)*/${${(As:,:)MATCH}[4]}}" ▶ 1 2
print "${list[@]/(#m)*/${${(s:,:)MATCH}[4]}}" ▶ 1 2 u
```

Side-note: `(A)` flag is often used together with `::=` assignment-substitution and `(P)` flag, to assign arrays and
hashes by-name.

### Searching arrays

```shell
declare -a array; array=( a b " c1" d ); print ${array[(r)[[:space:]][[:alpha:]]*]} ▶ c1
```

`\[[:space:]]` contains unicode spaces. This is often used in conditional expression like `[[ -z ${array[(r)...]} ]]`.

Note that [Skipping grep](#skipping-grep) that uses `:#` substitution can also be used to search arrays.

### Code execution in `//` substitution

```shell
append() { gathered+=( $array[$1] ); }
functions -M append 1 1 append
declare -a array; array=( "Value 1" "Other data" "Value 2" )
declare -a gathered; integer idx=0
: ${array[@]/(#b)(Value ([[:digit:]]##)|*)/$(( ${#match[2]} > 0 ? append(++idx) : ++idx ))}
print $gathered ▶ Value 1 Value 2
```

Use of `#b` glob flag enables math-code execution (and not only) in `/` and `//` substitutions. Implementation is very
fast.

### Serializing data

```shell
declare -A hsh deserialized; hsh=( key value )
serialized="${(j: :)${(qkv@)hsh}}"
deserialized=( "${(Q@)${(z@)serialized}}" )
print ${(kv)deserialized} ▶ key value
```

`j`-flag means join -- by spaces, in this case. Flags `kv` mean: keys and values, interleaving. Important `q`-flag
means: quote. So what is obtained is each key and value quoted, and put into a string separated by spaces.

`z`-flag means: split as if Zsh parser would split. So quoting (with backslashes, double quoting, and others) is
recognized. Obtained is array `( "key" "value")` which is then de-quoted with `Q`-flag. This yields original data,
assigned to hash `deserialized`. Use this to e.g. implement an array of hashes.

Note: to be compatible with `setopt ksharrays`, use `[@]` instead of `(@)`, e.g.:
`...( "${(Q)${(z)serialized[@]}[@]}" )`

#### Tip: serializing with Bash

```shell
array=( key1 key2 )
printf -v serialized "%q " "${array[@]}"
eval "deserialized=($serialized)"
```

This method works also with Zsh. The drawback is the use of `eval`, however, no problem may occur unless someone
compromises variable's value, but as always, `eval` should be avoided if possible.

## Real-world examples

### Testing for Git subcommand

Following code checks, if there is a `git` subcommand `$mysub`:

```shell
if git help -a | grep "^  [a-z]" | tr ' ' '\n' | grep -x $mysub > /dev/null > /dev/null; then
```

Those are `4` forks. The code can be replaced according to this guide:

```shell
local -a lines_list
lines_list=( ${(f)"$(git help -a)"} )
lines_list=( ${(M)${(s: :)${(M)lines_list:#   [a-z]*}}:#$mysub} )
if (( ${#lines_list} > 0 )); then
    …
fi
```

The result is just `1` fork.

### Counting unquoted-only apostrophes

A project was needing this to do some Zle line-continuation tricks (when you put a backslash-\ at the end of the line
and press enters – it is the line-continuation that occurs at that moment).

The required functionality is: in the given string, count the number of apostrophes, but _only the unquoted ones_. This
means that only apostrophes with null or an even number of preceding backslashes should be accepted into the count:

```shell
buf="word'continue\'after\\\'afterSecnd\\''afterPair"
integer count=0
: ${buf//(#b)((#s)|[^\\])([\\][\\])#(\'\'#)/$(( count += ${#match[3]} ))}
echo $count ▶ 3
```

The answer (i.e. the output) to the above presentation and example is: `3` (there are `3` unquoted apostrophes in total
in the string kept in the variable `$buf`).

Below follows a variation of the above snippet that doesn't use math-code execution:

```shell
buf="word'continue\'after\\\'afterSecnd\\''afterPair"
buf="${(S)buf//(#b)*((#s)|[^\\])([\\][\\])#(\'\'#)*/${match[3]}}"; buf=${buf%%[^\']##}
integer count=${#buf}
echo $count ▶ 3
```

This is possible thanks to `(S)` flag – non-greedy matching, `([\\][\\])#` trick – it matches only unquoted following
`(\'\'##)` characters (which are the apostrophes) and a general strategy to replace `anything-apostrope(s)` (unquoted
ones) with `the-apostrope(s)` (and then count them with `${#buf}`).

## Tips and Tricks

### Parsing INI file

With Zshell `extended_glob` parsing an `ini` file is an easy task. It will not result in a nested-arrays data structure
(Zsh doesn't support nested hashes), but the hash keys like `$DB_CONF[db1_<connection>_host]` is actually intuitive.

The code should be placed in a file named `read-ini-file`, in `$fpath`, and `autoload read-ini-file` should be invoked.

```shell
# $1 - path to the ini file to parse
# $2 - the name of output hash
# $3 - prefix for keys in the hash
#
# Writes to given hash under keys built-in following way: ${3}<section>_field.
# Values are values from the ini file. Example invocation:
#
# read-ini-file ./database1-setup.ini DB_CONF db1_
# read-ini-file ./database2-setup.ini DB_CONF db2_
#

setopt localoptions extendedglob

local __ini_file="$1" __out_hash="$2" __key_prefix="$3"
local IFS='' __line __cur_section="void" __access_string
local -a match mbegin mend

[[ ! -r "$__ini_file" ]] && { builtin print -r "read-ini-file: an ini file is unreadable ($__ini_file)"; return 1; }

while read -r -t 1 __line; do
    if [[ "$__line" = [[:blank:]]#\;* ]]; then
        continue
    # Match "[Section]" line
    elif [[ "$__line" = (#b)[[:blank:]]#\[([^\]]##)\][[:blank:]]# ]]; then
        __cur_section="${match[1]}"
    # Match "string = string" line
    elif [[ "$__line" = (#b)[[:blank:]]#([^[:blank:]=]##)[[:blank:]]#[=][[:blank:]]#(*) ]]; then
        match[2]="${match[2]%"${match[2]##*[! $'\t']}"}" # severe trick - remove trailing whitespace
        __access_string="${__out_hash}[${__key_prefix}<$__cur_section>_${match[1]}]"
        : "${(P)__access_string::=${match[2]}}"
    fi
done < "$__ini_file"

return 0
```
