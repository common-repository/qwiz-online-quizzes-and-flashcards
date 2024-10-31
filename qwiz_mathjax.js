const qwiz_mathjax_debug = false;
var   qwiz_wait_jquery_tries = 0;

const qwiz_wait_jquery = function () {
   if (typeof jQuery == 'undefined') {
      if (qwiz_mathjax_debug) {
         console.log ('[qwiz_mathjax.js] qwiz_wait_jquery:', qwiz_wait_jquery);
      }
      qwiz_wait_jquery_tries++;
      if (qwiz_wait_jquery_tries > 5) {
         return;
      }
      setTimeout (qwiz_wait_jquery, 500);
   } else {

      jQuery (document).ready (function () {
         if (qwiz_mathjax_debug) {
            console.log ('[qwiz_mathjax.js] window.MathJax:', window.MathJax);
         }
         if (! window.MathJax) {

            if (qwiz_mathjax_debug) {
               console.log ('[qwiz_mathjax.js] (load MathJax)');
            }
            var script = document.createElement ('script');
            script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
            document.head.appendChild (script);
         }

         const delay_qwiz_mathjax_config = function () {
            if (qwiz_mathjax_debug) {
               console.log ('[qwiz_mathjax.js > delay_qwiz_mathjax_config] window.MathJax:', window.MathJax);
            }
            if (! window.MathJax || ! window.MathJax.version) {
               setTimeout (delay_qwiz_mathjax_config, 200);
            } else {
               const mathjax_ver = MathJax.version[0];
               if (mathjax_ver == '2') {

                  MathJax.Hub.Queue (["Typeset", MathJax.Hub]);
               } else {

                  MathJax.startup.output.clearCache ();
                  MathJax.startup.getComponents ();
               }
            }
         }
         setTimeout (delay_qwiz_mathjax_config, 10);
      });
   }
}
setTimeout (qwiz_wait_jquery, 200);
