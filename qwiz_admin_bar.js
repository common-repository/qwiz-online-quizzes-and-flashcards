const qwiz_admin_bar_debug = true;

function qwiz_admin_bar_help (menu_item_el) {
   if (qwiz_admin_bar_debug) {
      console.log ('[qwiz_admin_bar.js] menu_item_el:', menu_item_el);
   }
   const $ = jQuery;
   var   $popup = $ ('div#qwiz_admin_bar_help');
   if (qwiz_admin_bar_debug) {
      console.log ('[qwiz_admin_bar.js] $popup:', $popup);
   }
   if (! $popup.length) {

      const offset = $ (menu_item_el).offset ();
      const left   = offset.left;
      const top    = offset.top;
      const htm = `
         <div id="qwiz_admin_bar_help" style="position: fixed; left: ${left}px; top: ${top}px; width: 600px; padding: 3px; background: white; border: 1px solid black; box-shadow: -3px 3px 2px gray; font-size: 10pt; z-index: 999;">
            <div onclick="qwiz_admin_bar_help_close ()" style="display: inline-block; float: right; color: red; cursor: pointer; line-height: 10px;">
               &#9746;
            </div>
            <br />
            <img src="https://qwizcards.net/wp-content/uploads/2022/03/classic-300x159.png" align="right" width="187" height="99" />

            If you are using the WordPress &ldquo;Block Editor&rdquo; (Gutenberg):
            <br />
            Create a new page or post.&nbsp;
            Start a Classic paragraph or block (type /classic and click on
            &ldquo;Classic Paragraph&rdquo;.

            <div style="clear: both;"></div>
            <br />
            It should then look something like this:

            <img src="https://qwizcards.net/wp-content/uploads/2022/03/classic_paragraph.png" width="556" height="104" />
            <br />

            Click the <img style="transform: translate(0, 4px); -webkit-transform: (0, 4px); box-shadow: none;" src="//qwizcards.net/wp-content/uploads/2019/07/icon_qwiz.png" width="17" height="17" />icon.&nbsp;
            (You may first have to click the "Toolbar Toggle" icon
            <img style="transform: translate(0, 4px); -webkit-transform: (0, 4px); box-shadow: none;" src="https://qwizcards.net/wp-content/uploads/2019/07/Toolbar_Toggle.png" alt="" width="24" height="20" />
            &ndash; the Q icon is in the second row of the editing tools.)
            <br />
            <br />
            In the &ldquo;Classic Editor&rdquo; (available as a plugin from
            WordPress), the
            <img style="transform: translate(0, 4px); -webkit-transform: (0, 4px); box-shadow: none;" src="//qwizcards.net/wp-content/uploads/2019/07/icon_qwiz.png" width="17" height="17" />icon
            should already be showing.
            <br />
            <div style="text-align: right;">
               <button onclick="qwiz_admin_bar_help_close ()" style="padding: 4px;">
                  Close
               </button>
            </div>
         </div>
      `
      $ ('body').append (htm);
      $popup = $ ('div#qwiz_admin_bar_help');
   }
   $popup.show ();

}


function qwiz_admin_bar_help_close () {
   const $ = jQuery;
   $ ('div#qwiz_admin_bar_help'). hide ();
}

