if (! window.console) {
   window.console = {log: function(){} };
}
pre_qwizzled = {};
var pre_qwizzledf = function () {
var debug = [];
debug.push (false);
var $ = jQuery;
var q = this;
var edit_area_selector = 'iframe#content_ifr, iframe#wpb_tinymce_content_ifr';
var $edit_area;
this.load_qwizzled_if_needed = function (ed, qwiz_button_b, swhs_button_b) {
   if (debug[0]) {
      console.log ('[load_qwizzled_if_needed] ed:', ed);
   }
   if (qwizzled.qwizard_b) {
      return false;
   }
   var ok_f = false;
   var gutenberg_f = false;
   if ($ (edit_area_selector).length) {
      if (debug[0]) {
         console.log ('[load_qwizzled_if_needed] $ (edit_area_selector):', $ (edit_area_selector));
      }
      if ($ (edit_area_selector).is (':visible')) {
         $edit_area = $ (edit_area_selector).contents ().find ('body');
         if ($edit_area.length > 0) {
            ok_f = true;
         }
      }
   } else {
      gutenberg_f = true;
      if ($ (ed.targetElm).hasClass ('wp-block-freeform')
          || $ (ed.targetElm).hasClass ('wp-block-qwizcards-blocks-editable')) {
         $edit_area = $ (ed.targetElm);
         if (debug[0]) {
            console.log ('[load_qwizzled_if_needed (Gutenberg)] $edit_area:', $edit_area);
         }
      }
   }
   if (ok_f) {
      if (! qwiz_button_b && ! swhs_button_b) {
         var $contains_qwiz  = $edit_area.find ('*:contains("[qwiz")');
         var $contains_qdeck = $edit_area.find ('*:contains("[qdeck")');
         var $contains_rdgm  = $edit_area.find ('*:contains("[rdgm")');
         if (debug[0]) {
            console.log ('[load_qwizzled_if_needed] $contains_qwiz:', $contains_qwiz, ', $contains_qdeck:', $contains_qdeck);
         }
         if ($contains_qwiz.length == 0 && $contains_qdeck.length == 0
                                                && $contains_rdgm.length == 0) {
            return false;
         }
      }
      const url = qwizzled_params.url;
      function menu_start () {
         if (debug[0]) {
            var msec = new Date ().getTime ();
            console.log ('[pre_qwizzled.js > menu_start] url:', url);
            console.log ('[pre_qwizzled.js > menu_start] msec:', msec);
         }
         if (typeof (qwizzled) == 'undefined') {
            setTimeout (menu_start, 10);
         } else {
            if (qwizzled_params.qwizcards_active_f) {
               if (debug[0]) {
                  console.log ('[pre_qwizzled.js > menu_start] show_main_menu (Qwizcards)');
               }
               if ($contains_qwiz.length || $contains_qdeck.length) {
                  qwizzled.show_main_menu (ed, true, false);
               }
            }
            if (qwizzled_params.swinging_hotspot_active_f) {
               if (debug[0]) {
                  console.log ('[pre_qwizzled.js > menu_start] show_main_menu (r-Diagrams)');
               }
               if ($contains_rdgm.length) {
                  rdgm_edit.show_main_menu (ed, false, true);
               }
            }
         }
      }
      setTimeout (menu_start, 10);
   } else {
      if (qwiz_button_b || swhs_button_b) {
         console.log ('[load_qwizzled_if_needed] ed:', ed);
         if (gutenberg_f) {
            alert ('Could not find editor block.');
         } else {
            alert ('Could not find editing window.  You need to be editing a page or post in Visual mode.');
         }
         return false;
      }
   }
}
};
pre_qwizzledf.call (pre_qwizzled);
