---
id: zui
title: ⚙️ ZUI
image: /img/png/theme/z/320x320.png
toc_max_heading_level: 3
description: The Rapid Application Development textual user interface library for Zsh.
keywords:
  - zui
  - zsh-plugin
  - user-interface
---

<!-- @format -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';
import Player from "@site/src/components/Player";
import APITable from '@site/src/components/APITable';
import Screen1 from '/img/png/content/zui/zui-hello-world-fs8.png';
import Screen2 from '/img/png/content/zui/zui-text-fields-fs8.png';
import Screen3 from '/img/png/content/zui/zui-list-boxes-fs8.png';
import Screen4 from '/img/png/content/zui/zui-history-fs8.png';
import Screen5 from '/img/png/content/zui/zui-edit-fs8.png';
import Shortcuts from '@site/src/components/Markdown/\_player_shortcuts.mdx';

## CGI+DHTML-like User Interface Library for Zsh / ZCurses

### <i class="fa-brands fa-github"></i> [z-shell/ZUI][]

This is a RAD (Rapid Application Development) textual user interface library for Zsh. It in many aspects resembles a typical CGI+(D)HTML setup. There are:

- Generators ran on the "server" side (basic Zshell-code that is just generating text!),
- Event loop that turns the generated text into a document with active elements (buttons, anchors, toggle buttons, text fields, list boxes),
- Mechanism to regenerate document parts from the original generators.

So, a Zshell code generates text. It is then turned into a document with hyperlinks. DHTML-like calls are possible that will regenerate document parts on the fly. Page can be also reloaded with input data, just like an HTML page. A voiced [video tutorial][3] or [file on google drive][4] shows how to create an application – Nmap network scanner frontend.

### Learning Zsh

ZUI will allow you to learn Zsh at the advanced level. The library uses Zshell e.g. Ruby. To write a functional program in Ruby, you need to know the language. To write a command or alias in Zsh, you can spend years not learning anything new. With ZUI you will learn how to use `coproc`, patterns with `(#b)` flag, Zstyles, arrays, hashes, and various substitutions. That said, examples are there to make the process easy, and problems have an easy and advanced way of issue solving.

### API

The API consists of [Standard Library](#standard-library), [Utilities Library](#utilities-library) and [Callbacks](#callbacks). You normally want a few calls from Standard Library – to create buttons and regenerate document parts, and one or two callbacks. The fastest way to learn ZUI is to look at [Hello World example][5] and other [example codes][6] like the [timeout example][7].

## Screenshots

<div className="ScreenView">
  <Image img={Screen1} alt="Hello World" />
</div>

**Text-fields demo, showing what color "default" can do:**

<div className="ScreenView">
  <Image img={Screen2} alt="Text Fields" />
</div>

**List-boxes demo:**

<div className="ScreenView">
  <Image img={Screen3} alt="List-boxes" />
</div>

**History demo – fully functional history tool with the incremental search:**

<div className="ScreenView">
  <Image img={Screen4} alt="History demo" />
</div>

**Text Editor demo, written in 30 minutes:**

<div className="ScreenView">
  <Image img={Screen5} alt="Text Editor demo" />
</div>

## Asciinema

Videos on the service `Asciinema`, where you can resize the video like a normal web page, and select/copy text.

List boxes, text fields:

```mdx-code-block
<Tabs className="player-tabs">
  <TabItem value="sbin-player" label="Player" default>
    <Player
      src='https://asciinema.org/a/107691.cast'
      rows={26}
      cols={131}
    />
  </TabItem>
  <TabItem value="shortcuts" label="Shortcuts">
    <Shortcuts />
  </TabItem>
</Tabs>
```

Text editor written in 30 minutes:

```mdx-code-block
<Tabs className="player-tabs">
  <TabItem value="sbin-player" label="Player" default>
    <Player
      src='https://asciinema.org/a/513810.cast'
      rows={22}
      cols={112}
    />
  </TabItem>
  <TabItem value="shortcuts" label="Shortcuts">
    <Shortcuts />
  </TabItem>
</Tabs>
```

Configure/Make wrapper:

```mdx-code-block
<Tabs className="player-tabs">
  <TabItem value="sbin-player" label="Player" default>
    <Player
      src='https://asciinema.org/a/107688.cast'
      rows={26}
      cols={131}
    />
  </TabItem>
  <TabItem value="shortcuts" label="Shortcuts">
    <Shortcuts />
  </TabItem>
</Tabs>
```

## Standard Library

Standard Library contains functions to:

- Initialize and clean up an application,
- Load and set the application's configuration,
- Create hyperlinks (buttons, anchors, text fields, list boxes),
- Handle hyperlinks (e.g. check if the given text is a hyperlink),
- Control document regeneration on-the-fly (the DHTML-like way),
- Handle modules (e.g. read module's position in the document).

### Calls of Standard Library

Below are descriptions of Standard Library functions. Arguments in triangular brackets are mandatory, in square brackets – optional.

---

#### -zui_std_init

```shell
-zui_std_init [app:"application ID"] [app_name:"Application name"]
```

Initializes application. To be called **before emulate**. Optional argument `app:...` will set `ZUI[app]` – hash field needed by any application. Argument `app_name:` does the same for `ZUI[app_name]` (it is a human-readable application name, displayed in header).

---

#### -zui_std_init2

```shell
-zui_std_init2
```

Initialization to be called **after emulate**. `emulate` is the command that makes a function an independent program and each ZUI application should use it.

---

#### -zui_std_stalog

```shell
-zui_std_stalog <Text 1> [Text 2] ...
```

Appends a message to the status window logs. Each text argument has a color assigned – see the `log_colors` [zstyle](#zstyles), it controls the colors.

---

#### -zui_std_special_text

```shell showLineNumbers
-zui_std_special_text <text> [output array]
reply+=( "{output string}" )
```

Quote special characters in the text. This allows to use of strings like `That's` in the document – special character `'` will not disturb content. The default output array is `reply`.

---

#### -zui_std_button_ext

```shell
-zui_std_button_ext <ID> <data1> <data2> <data3> <data4> <button text> [handler] [output array]
```

Creates string with the button. Every button has an ID assigned – it is the first argument. Then go four user-data arguments – if the handler will be invoked, the user-data will be passed to it along with the ID. `<button text>` is the label of the button. `[handler]` is the function name or inline code to be called at the press of the button. `[output array]` name can be provided to have the result appended to that array (the default array is `reply`). If the handler has a substring "internal" in it (in function name or inline code), then it will be invoked without a list restart. Otherwise, a list restart will be performed (this is like invoking JavaScript without web page reload, or doing the reload and calling code on the server side).

---

#### -zui_std_rc_button_ext

```shell
-zui_std_rc_button_ext <ID> <data1> <data2> <data3> <data4> <button text> [handler] [output array]
```

The function works identically to `-zui_std_button`, but it wraps button text in square brackets – "rc" is for "rectangular". Also, both functions have no-`_ext` versions that do not have `<data1>`...`<data4>` arguments.

---

#### -zui_std_anchor

```shell
-zui_std_anchor <ID> <index> <data1> <data2> <data3> <button text> [handler] [output array]
```

Creates an anchor – a hyperlink that moves the cursor to the specified line. Appends it to `[output array]` (a parameter specified by name) – `reply` by default. `<index>` is the line number to jump to. It is relative to the current module. It in general cannot point to the absolute line number in the document. To point to the line outside the module, use `A+B` syntax, e.g. `1-2`, to jump `2` lines before the first line of the module. Instead of the handler, you may use `<data2>` and `<data3>` to pass a module regeneration instruction. For example, pass `",mod2_ice1,"` `"arg"` to regenerate some module numbered 2, instance 1, with passed user-data "arg". This regeneration is with list restart (i.e. it is like a web page reload with `arg` passed to script on the server side). If the handler has substring "internal" in it (in function name or inline code), then the anchor will be internal – will not cause the document to reload. Anchor of which `<data2>` matches `,*,` is set to be external. Example call:

```shell
-zui_std_anchor regen1 4 "" ",mod1_ice1," $RANDOM "[${ZUI[MAGENTA]}Regen${ZUI[FMT_END]}]"
```

This instructs to regenerate module `1` instance `1`, with no handler call, with `$RANDOM` as the generator's third input - regeneration user-data. `4` is the line number on which the cursor will be placed after the regeneration. Note that any generator call has instance ID (mod and ice) in `$1` and `$2` by the design of the restart-regeneration loop.

---

#### -zui_std_text_field

```shell
-zui_std_text_field <ID> <width param> <index param> <text param> <data1> <data2> <data3> [handler] [output array]
```

Creates text-field. Every text field has width, given indirectly, by supplying the **name of variable** holding the width number. In the same way, the start-index is to be provided – it specifies from which character the text should be displayed (so it can e.g. start from the 5th character). `<text param>` is the name of the variable holding the string that the text field contains. The handler will be called on the accept event (i.e. Enter-press; Cancel is ESC-press, it restores previous text-field contents).

---

#### -zui_std_list_box

```shell
-zui_std_list_box <ID> <width param> <index param> <options param> <data1> <data2> <data3> [handler] [output array]
```

Creates list-box. Every list box has a text width that it will occupy in the document regardless of the option's text length. This width is specified via **name of variable** holding the width number. Current-selected option is `<index param>` – also a variable name. Options are specified by `;`-separated string, put in a variable whose name is passed as the fourth argument (`<options param>`). The handler will be called on the accept event (i.e. Enter-press; Cancel is ESC-press, it restores previous list-box current option).

---

#### -zui_std_get_ganchor

```shell
-zui_std_get_ganchor <module index> <instance index> <button text>
```

Anchors cannot use global indexes and easily point to other modules. However, there are `top anchors` that point to each module. The top anchors can be hidden. However they are always accessible by this function. It fetches anchor pointing to module `<module index>`, instance `<instance index>`. The anchor will be having specified `<button text>`. You can use it as any other anchor, with the notable fact that the handler cannot be specified, however, a callback will be called on the anchor's press: `-zui-standard-global-anchors-callback()`, with the anchor's ID in `$1`, line number in `$2`, module index in `$3`, instance index in `$4`.

---

#### -zui_std_decode_hyperlink

```shell showLineNumbers
-zui_std_decode_hyperlink <hyperlink string> [output array]
array=( ID data1 data2 data3 data4 )
```

Decodes given hyperlink (anchor, button, raw link). Its ID and user data are placed in an array given by name (default is the `reply` array). Testable.

---

#### -zui_std_decode_text_field

```shell showLineNumbers
-zui_std_decode_text_field <hyperlink string> [output array]
array=( ID width-param index-param text-param data1 data2 data3 )
```

Decodes given text-field hyperlink. Its ID, names of backend parameters, and user data are placed in the array given by name (default is the `reply` array). Testable.

---

#### -zui_std_decode_list_box

```shell showLineNumbers
-zui_std_decode_list_box <hyperlink string> [output array]
array=( ID width-param index-param options-param data1 data2 data3 )
```

Decodes given list-box hyperlink. Its ID, names of backend parameters, and user data are placed in the array given by name (default is the `reply` array). Testable.

---

#### -zui_std_decode

```shell showLineNumbers
-zui_std_decode <hyperlink string> [output parameter] [output array]
array=( {data decoded from hyperlink} )
parameter=1|2|3
```

Tries various decoding functions (for regular hyperlinks, text fields, list boxes). Testable. Returns (in `REPLY` or specified parameter) 1 if recognized regular hyperlink (anchor, button, raw link), 2 if text field, 3 if list-box. Will return 0 for unrecognized string, however, the function is testable so a normal return value test can be performed.

---

#### -zui_std_get_stext

```shell showLineNumbers
-zui_std_get_stext <special-text string> [output parameter]
REPLY={text}
```

Output variable (default: `REPLY`) is set to text contained in the special-text string.

---

#### -zui_std_is_hyperlink

```shell
-zui_std_is_hyperlink <hyperlink string>
```

Checks if a given string is a regular hyperlink (anchor, button, raw link). Testable (true – the string is a correct hyperlink).

---

#### -zui_std_is_text_field

```shell
-zui_std_is_text_field <hyperlink string>
```

Checks if a given string is a text field. Testable (true – the string is a correct text field).

---

#### -zui_std_is_list_box

```shell
-zui_std_is_list_box <hyperlink string>
```

Checks if a given string is a list box. Testable (true – the string is a correct list box).

---

#### -zui_std_is_any_hyperlink

```shell showLineNumbers
-zui_std_is_any_hyperlink <hyperlink string> [output parameter]
parameter=1|2|3
```

Checks if a given string is any possible hyperlink, from anchor to list-box. Output parameter (`REPLY` by default) will contain 1 if recognized regular hyperlink, 2 if text-field, and 3 if list-box. For an unrecognized string, it will contain 0, however, the function is testable, so a regular return value check can be performed.

---

#### -zui_std_has_any_hyperlinks

```shell
-zui_std_has_any_hyperlinks <hyperlink string>
```

Similar to `-zui_std_is_any_hyperlink`, but doesn't return the type of the hyperlink recognized. Testable.

---

#### -zui_std_load_config

```shell
-zui_std_load_config <variable> <default> <time limit> <output parameter>
```

Loads variable from configuration if it's older than e.g. `2` seconds (the `<time limit>` argument). Time limit is used only if `<output parameter>` points to `ZUI` hash field, e.g. `ZUI[text_mode]`. Otherwise, the configuration is always read regardless of the time limit. `<variable>` should have a `b:` prefix for boolean type, and `s:` for string type (`s:` is the default). Boolean variables are mapped to just `0` or `1`, the same only values are accepted as `<default>` values for that variable type. Example call:

```shell
-zui_std_load_config s:text_mode "off" 2 'ZUI[text_mode]'  # No text-segment navigation
```

The **Zstyle** variable is looked up at path `:plugin:zui`, then at `:plugin:zui:app:${ZUI[app]}`. The latter path has higher priority.

---

#### -zui_std_store_default_app_config

```shell
-zui_std_store_default_app_config <variable> <value>
```

Store the given variable to Zstyle **if** the variable is not already set. Can be used to set up the default configuration of the application. The user will be still able to set his configuration, the function will not overwrite it. Example call:

```shell
-zui_std_store_default_app_config b:top_anchors 0  # No top-anchors
```

---

#### -zui_std_cleanup

```shell
-zui_std_cleanup [serialize|deserialize:"app"]
```

Clears the `ZUI` hash – all configuration fields, anchors, buttons, etc. Also, clears fields that start with `my_` – this is the provided namespace to use by applications. If `serialize` is given, will store `my_*` fields and `zui-list` state fields into a special `ZUI` field. It can be then retrieved by `deserialize: "app"` – the effect will be as if the application was never left.

---

#### -zui_std_set_mod_factor

```shell
-zui_std_set_mod_factor <module index> <factor>
```

Sets how many instances of a module given by index should be generated (the module factor).

---

#### -zui_std_get_mod_factor

```shell
-zui_std_get_mod_factor <module index> [output parameter]
```

Gets several instances of a module given by index. Stores result in `REPLY`, or in other parameters specified by name.

---

#### -zui_std_load_global_index_and_size

```shell
-zui_std_load_global_index_and_size <module index> <instance index> [output param1] [output param2]
```

Loads where the module is located (at which line in the document) and what size it has (how many lines it occupies). Stores to `REPLY` and `REPLY2` by default, or to specified parameters.

---

#### -zui_std_reset_replies

```shell
-zui_std_reset_replies
```

Generators use parameters `reply`, `reply2`, `reply3`, and `reply4`. This function clears them.

---

#### -zui_std_map_replies

```shell
-zui_std_map_replies
```

Generator output should be mapped onto parameters:

```shell showLineNumbers
mod${midx}_ice${iidx}_output
mod${midx}_ice${iidx}_size
mod${midx}_ice${iidx}_nonselectables
mod${midx}_ice${iidx}_hops
mod${midx}_ice${iidx}_anchors
```

This function does this. It should normally not be needed, `-zui_std_fly_mod_regen` does this automatically.

---

#### -zui_std_fly_mod_regen

```shell
-zui_std_fly_mod_regen <module index> <instance index>
```

Schedules on-the-fly document-fragment update. This corresponds to DHTML, to doing `document.getElementById('...').innerHtml=...`. No list restart is required (no "page reload"). Arguments `<module index>` and `<instance index>` specify which module instance should be regenerated. The generator used to obtain new content is taken from the `zui-event-loop` list (see `-zui_std_fly_array_refresh`) and depends only on `<module index>`. In other words, the same generator is used, the one normally assigned to the module instance.

---

#### -zui_std_fly_mod_regen_ext

```shell
-zui_std_fly_mod_regen <generator> <module index> <instance index>
```

The same as `-zui_std_fly_mod_regen`, but uses alternate, specified generator-function.

---

#### -zui_std_fly_array_refresh

```shell
-zui_std_fly_array_refresh <module index>
```

Submits on-the-fly array refresh. The given `<module index>` should point to an array ("a:" prefix at `zui-event-loop`).

The array will be read again and pasted into the document replacing previous content. For example, in the history demo there is:

```shell
zui-event-loop 1:demo_generator_A a:u-history 1:demo_generator_A
```

The second module (and 1st instance) is an array `history` that is made unique (the `u-` prefix). You can refresh that content (document fragment) via:

```shell
-zui_std_fly_array_refresh 2
```

## Utility Library

Standard Library contains functions to:

- automate toggle buttons,
- strip color codes from text, etc.

### Calls of Utilities Library

Below are descriptions of Utilities Library functions. Arguments in triangular brackets are mandatory, in square brackets – optional.

---

#### -zui_util_map_bools

```shell
-zui_util_map_bools <expressions> <parameters> <true string> <false string>
```

Maps boolean values of expressions given in `$1` (string with entries separated by ';') to parameters given via names in `$2` (separated by ';'). For true, `<true string>` is assigned to the corresponding parameter, `<false string>` for false.

Example call:

```shell showLineNumbers
local color1 color2 color3
-zui_util_map_bools "1;[[ a = b ]];ZUI[text_select]" "color1;color2;color3" $red $white
```

Parameter `color1` will be set to `$red`, `color2` to `$white`, `color3` will be assigned depending on `$ZUI[text_select]` value. Use this to automate toggle buttons – highlight the buttons with one of two colors, depending on the state of a backend variable.

---

#### -zui_util_strip_codes

```shell
-zui_util_strip_codes <text>
```

Strip formatting codes from the text and save the result into parameter `REPLY`.

---

#### -zui_util_get_time

```shell showLineNumbers
-zui_util_get_time
REPLY="H:M time string"
```

Returns time in format `%H:%M`, via `datetime` module (fast) or `date` command as a fallback

---

#### -zui_util_get_datetime

```shell showLineNumbers
-zui_util_get_datetime
REPLY="Ymd_H.M.S date string"
```

Returns date and time. Uses `datetime` zsh module (fast) or `date` command as a fallback.

---

#### -zui_util_get_timestamp

```shell showLineNumbers
-zui_util_get_timestamp
REPLY={seconds}
```

Returns timestamp, via `datetime` module (fast) or `date` as a fallback.

---

#### -zui_util_has_default_color

```shell
-zui_util_has_default_color
```

Returns true if the "default" color can be used with current `Zsh`/`zcurses`.

---

#### -zui_util_resolve_path

```shell showLineNumbers
-zui_util_resolve_path <current working directory> <file path>
reply[1]={dir-name}
reply[2]={base-name}
```

Resolves absolute path to file from `<current working directory>` and `<file path>`. Returns the path as two components, dir-name in `reply[1]`, and base-name in `reply[2]`.

---

#### -zui_util_to_cmd_line

```shell
-zui_util_to_cmd_line <text>
```

Puts given text on the command line - regardless of Zle being active or not

---

#### -zui_util_circular_next

```shell showLineNumbers
-zui_util_circular_next <base> <size>
REPLY={path}
```

Returns next file to write to in circular buffer set of file names `<base>.1` `<base>.2` ... `<base>.<size>`. The buffer is ordered according to modification time – the oldest file from the set is the returned one (so after writing the circular buffer updates). Files are located in `~/.config/zui/var/circular_buffers`.

---

#### -zui_util_circular_paths

```shell showLineNumbers
-zui_util_circular_paths <base>
reply=( {path1} {path2} ... )
```

Returns absolute file paths of the given circular buffer. The paths are ordered from most recent to least recent. No count is obtained, so all files are returned, even actually disabled by any used `<size>` (with `-zui_util_circular_next`).

### Callbacks

Many situations are solved by callbacks. This eases the API, you don't have to e.g. supply a function name in a call but instead just define a function. Callback names follow scheme `-zui-standard-*-callback`. They are automatically cleared at cleanup (i.e. at the `-zui_std_cleanup` call).

---

#### -zui-standard-timeout-callback

```shell
-zui-standard-timeout-callback
```

Called when `$ZUI[timeout]` milliseconds pass without user input (the timeout defaults to `-1`, i.e. no timeout defined). No arguments and the return value is not checked. Redraw of the screen might be invoked by setting `$ZUI[timeout_update]` to `1`. Regeneration of module can be scheduled by invoking `-zui_std_fly_mod_regen`, this implies setting `$ZUI[timeout_update]`. `$ZUI[timeout]` is a Zstyle of the same name.

[zui-demo-timeout][7] covers this callback.

---

#### -zui-standard-text-select-callback

```shell
-zui-standard-text-select-callback <type> <text>
```

Called when a text is selected. This is possible when Zstyle `text_select` is `1`. The Zstyle `text_mode` can be `off` – only whole lines can be then selected. `<type>` is then set to string `line`. If `text_mode` is `hyp`, then text segments at lines with hyperlinks can be selected. When it is `nohyp` then this applies to lines without hyperlinks. Value `all` allows the selection of text segments at all lines, with or without hyperlinks. If a text-segment is selected, `<type>` is set to string `segment`.

---

#### -zui-standard-global-anchors-callback

```shell showLineNumbers
-zui-standard-global-anchors-callback <id> <initial line> <module index> <instance index>
```

Invoked when a global anchor is pressed. Global anchors are typically at the first line of the document, controlled by Zstyle `top_anchors`. First argument `<id>` is the ID of the anchor button, in format `aglobal_m<module-index>_i<instance-index>`. The second argument `<initial line>` is set to the destination line used when creating the anchor –&nbsp; it might have been changed by dynamic updates to document, i.e. module-regeneration that shifts target lines up or down. `<module index>` and `<instance index>` specify to which module instance the anchor is jumping.

---

#### -zui-standard-status-callback

```shell showLineNumbers
-zui-standard-status-callback 0 <selectable> <uniq> <search> <line> <segment>
-zui-standard-status-callback 1 <selectable> <uniq> <search> <line> <segment> ...
```

Called after each key-press and also when timeout-callback schedules document update –&nbsp;`$ZUI[timeout_update]` is then `1`. The first argument can be `0` or `1` and it is the type of active segment –&nbsp;`0` is the case: no-hyperlink-active. `<selectable>` **/** `<uniq>` **/** `<search>` are `0` or `1` and denote if current line is selectable **/** if uniq mode is enabled **/** if there is a search query entered. Arguments `<line>` and `<segment>` are current line and segment.

For the variant with `1` in the first argument, what follows is current-hyperlink decoded data. For anchors and buttons, it is (follows code to be used to read the input):

```shell
local id="$7" data1="$8" data2="$9" data3="$10" data4="$11"
```

For text fields, it is:

```shell
local id="$7" width="$8" index="$9" text="$10" data1="$11" data2="$12" data3="$13"
```

For list boxes, it is:

```shell
local id="$7" width="$8" index="$9" options_text="$10" data1="$11" data2="$12" data3="$13"
```

You can test for `tfield` in the ID of a text field, and `lbox` in the ID of a list box. These strings are prepended to the IDs that you use when creating those hyperlinks. You can then read the whole data as follows:

```shell showLineNumbers
local tpe="$1" selectable="$2" uniq="$3" search="$4" line="$5" segment="$6"
shift 6
[[ "$1" = *(tfield|lbox)* ]] && local id="$1" width="$2" index="$3" text="$4" data1="$5" data2="$6" data3="$7" ||
                                local id="$1" data1="$2" data2="$3" data3="$4" data4="$5"
```

The main function of the status callback is adding a message to the status window. It should return `1` and set array `reply` to add
the message. For example:

```shell showLineNumbers
reply=( "My " "new " "message" )
return 1
```

Returning `0` means not-updating the status window, and `reply` is then ignored.

### Zstyles

To change ZUI global default, invoke:

```shell
zstyle ":plugin:zui" colorpair "white/black"
```

An application may override such default with its default. To change the default per application, invoke:

```shell
zstyle ":plugin:zui:app:zui-demo-fly" colorpair "250/17"  # 256 colors – zsh >= 5.3; "default" color also from this version
```

Below is a complete list of available Zstyles with ZUI default values.

```mdx-code-block
<APITable>
```

| `zstyle` name    | Default                                                | Description                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "colorpair       | "white/black"                                          | Default text and background color. For Zsh >= 5.3, color "default" is available, it might be e.g. transparent (depends on terminal configuration)                                                                                                                                                                                                                                   |
| border           | "no"                                                   | No border around main window                                                                                                                                                                                                                                                                                                                                                        |
| border_cp        | "yellow/black"                                         | Border (and header) color                                                                                                                                                                                                                                                                                                                                                           |
| bold             | "no"                                                   | No default bold                                                                                                                                                                                                                                                                                                                                                                     |
| status_colorpair | "white/black"                                          | The same as "colorpair", but for status window                                                                                                                                                                                                                                                                                                                                      |
| status_border    | "no"                                                   | No border around status window                                                                                                                                                                                                                                                                                                                                                      |
| status_border_cp | "green/black"                                          | Border color of status window                                                                                                                                                                                                                                                                                                                                                       |
| status_bold      | "no"                                                   | No default bold in status window                                                                                                                                                                                                                                                                                                                                                    |
| mark             | "red reverse lineund"                                  | String starting with one or two color names continued with a combination of reverse, underline, blink, bold, lineund, linerev. The last two underlines, reverse the whole active line. The rest mark the active button. Uppercase color names are for background                                                                                                                    |
| altmark          | "red reverse"                                          | As "mark", but for terminals without underline support                                                                                                                                                                                                                                                                                                                              |
| mark2            | "yellow reverse"                                       | The same as "mark", but for buttons with background color                                                                                                                                                                                                                                                                                                                           |
| altmark2         | "yellow reverse"                                       | The same as "altmark", but for "mark2", i.e. mark for buttons with background color, on terminals with no underline support                                                                                                                                                                                                                                                         |
| status_size      | 4                                                      | Height of status window, including border (drawn or not)                                                                                                                                                                                                                                                                                                                            |
| status_pointer   | "yes"                                                  | Show line indicating the position in document                                                                                                                                                                                                                                                                                                                                       |
| log_append       | "above"                                                | Put log messages on top of others. Also available: "below"                                                                                                                                                                                                                                                                                                                          |
| log_time_format  | "[%H:%M] "                                             | Display hour:minute time stamp. Set to "to disable the time stamp completely                                                                                                                                                                                                                                                                                                        |
| log_index        | "yes"                                                  | Show order number of log messages                                                                                                                                                                                                                                                                                                                                                   |
| log_size         | "32"                                                   | How many log messages to keep in memory                                                                                                                                                                                                                                                                                                                                             |
| top_anchors      | "yes"                                                  | Show anchors to each module instance at the top                                                                                                                                                                                                                                                                                                                                     |
| log_colors       | "white cyan yellow green cyan red magenta yellow blue" | The colors used for log messages. The first two are for the message's index and time stamp                                                                                                                                                                                                                                                                                          |
| select_mode      | "no-restart"                                           | What to do on non-hyperlink selection. Such selection will invoke a text-select callback with a segment or whole line passed as an argument. Plus, it will set ZUI[line_selected] or ZUI[pure_text_selected]. If the Zstyle is set to "restart" then list restart will be performed. If set to "quit" then the event loop will be exited, and REPLY will be set to line or segment. |
| text_mode        | "all"                                                  | Navigate across each bit of text, not only hyperlinks. "hyp" – only at lines with hyperlinks, "nohyp" – only at lines with no hyperlinks, "off" - text-bit navigation fully turned off                                                                                                                                                                                              |
| text_select      | "yes"                                                  | Allow selection on non-hyperlinks (full lines when text_mode is "off" or "hyp" – meaning text-bit mode fully turned off or enabled only for lines with hyperlinks, leaving text-only lines undivided)                                                                                                                                                                               |
| timeout          | "-1"                                                   | No calls to timeout callback. Denotes milliseconds. The minimum value is 200. Time is counted when there is no user input                                                                                                                                                                                                                                                           |
| palette          | "black:red:green: yellow:blue:magenta: cyan:white"     | 8-color palette used by ZUI. The default is a normal ANSI palette. Can be changed to indexes of 256 colors (zsh >= 5.3)"                                                                                                                                                                                                                                                            |

```mdx-code-block
</APITable>
```

All Zstyles are available in the ZUI repository: [Zstyles][11]

### Example - Hello World

Started from Zle or the command line

```shell showLineNumbers
-zui_std_cleanup deserialize:"zui-demo-hello-world"
-zui_std_init app:"zui-demo-hello-world" app_name:"ZUI Hello World"
emulate -LR zsh -o extended_glob -o type_set_silent -o warn_create_global
-zui_std_init2 # after emulate -LR

-zui_std_store_default_app_config b:border 1

demo_generator_A() {
  local mod="$1" ice="$2"
  # Content, no hyper-links
  reply=( "Hello World from ${ZUI[YELLOW]}ZUI${ZUI[FMT_END]}! Module $mod, instance $ice." )
  # Non-selectable lines   Hops to jump with [ and ]   Local anchors
  reply2=( )               reply3=( 1 )                reply4=( )
}

## Start application ##
zui-event-loop 1:demo_generator_A

-zui_std_cleanup serialize
```

Other example which uses list-box: [zui-demo-list-box][].

### Install ZUI

<Tabs>
  <TabItem value="standalone" label="Standalone" default>

Unpack `zui` somewhere and add to `.zshrc`:

```shell title="~/.zshrc"
source {where-zui-is}/zui.plugin.zsh
```

  </TabItem>
  <TabItem value="zi" label="Zi">

Add the following to your `.zshrc` file.

```shell title="~/.zshrc"
zi load z-shell/zui
```

  </TabItem>
  <TabItem value="zgen" label="Zgen">

Add the following to your `.zshrc` file in the same place you're doing your other `zgen load` calls.

```shell title="~/.zshrc"
zgen load z-shell/zui.git
```

  </TabItem>
  <TabItem value="oh-my-zsh" label="Oh-My-Zsh">

Clone the Repository:

```shell title="~/.zshrc" showLineNumbers
git clone https://github.com/z-shell/zui.git \
  ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zui
```

And add `zui` to your plugin list.

  </TabItem>
</Tabs>

<!-- end-of-file -->
<!-- links -->
<!-- external -->

[z-shell/zui]: https://github.com/z-shell/zui
[3]: https://youtu.be/TfZ8b_RS_Bg
[4]: https://drive.google.com/file/d/1mg6OPScurIT_AIJPotEzpw1TrnU0OeUZ/view?usp=sharing
[5]: https://github.com/z-shell/zui/blob/main/demos/zui-demo-hello-world
[6]: https://github.com/z-shell/zui/tree/main/demos
[7]: https://github.com/z-shell/zui/blob/main/demos/zui-demo-timeout
[11]: https://github.com/z-shell/zui/blob/main/docs/ZSTYLES.md
[zui-demo-list-box]: https://github.com/z-shell/zui/blob/main/demos/zui-demo-list-boxes
