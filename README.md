This extension tries to emulate the Vim "scrolloff" feature, which ensures that there are always a certain number of lines visible above and below the cursor when scrolling. Due to limitations in the VSCode extension API, it doesn't work as expected when the number of visible lines in the editor window is smaller than scrolloff*2. If you avoid this case then there should be no problems.

Additionally there is an option to always keep the view centered on the cursor. This mode works flawlessly with any editor size.

### Settings

#### `"scrolloff.scrolloff"`
* The number of lines to keep visible above and below the cursor.
* Default: `15`

#### `"scrolloff.alwaysCenter"`
* Whether to always keep the view centered on the cursor.
* Overrides the above setting.
* Default: `false`