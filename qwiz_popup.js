// [qpopup] ... [/qpopup] shortcode.  Pop up contents with some options.

// =============================================================================
// Isolate namespace.
q_popup_ = {};
var q_popupf = function () {
   const debug = true;

   var $ = jQuery;
   var qqc;

   $ (document).ready (function () {
      qqc = qwiz_qcards_common;

      // Do only if user not logged in.
      if (! document_qwiz_user_logged_in_b) {

         // Find the first div.
         const $qwiz_popup_div = $ ('div.qwiz_popup').first ();

         // Optional time-till-show.  Default: 5 sec.
         var time_till_show = $qwiz_popup_div.data ('show');
         if (typeof (time_till_show) != 'undefined') {
            time_till_show *= 1000;
         } else {
            time_till_show = 5000;
         }

         // ......................................................
         // Support variable delay.
         var delay_popup = function () {

            // Do only if no cookie for "previously-shown" for this popup (i.e.,
            // this page).
            if (! $.cookie ('qwiz_popup')) {

               // Set cookie.
               const options = {expires: 3650};
               $.cookie ('qwiz_popup', 1, options);

               // Default height is "auto".  Default width: 500px.
               var width = $qwiz_popup_div.data ('width');
               if (! width) {
                  width = 500;
               }
               var height = $qwiz_popup_div.data ('height');
               if (! height) {
                  height = 'auto';
               }

               // Use jQuery dialog to show content.
               $dialog_qwiz_popup = $qwiz_popup_div.dialog ({
                  autoOpen:      true,
                  width:         width,
                  height:        height,
                  modal:         true,
                  buttons:       {'Close':   function () {
                                                $dialog_qwiz_popup.dialog ('close');
                                             }
                                 }
               });


            }
         }
         // ......................................................
         const wait_ready = function () {
            if (document_qwiz_user_logged_in_b == 'not ready') {
               if (debug) {
                  console.log ('[qwiz_popup.js > wait_ready ()] not ready');
               }
               setTimeout (wait_ready, 100);
            } else {
               setTimeout (delay_popup, time_till_show);
            }
         }
         setTimeout (wait_ready, 100);
      }
   });

   // Close - isolate namespace.
};
q_popupf.call (q_popup_);

