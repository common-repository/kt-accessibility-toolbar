function notifySettingsSaved() {
  jQuery("#ktat_notification").
    fadeIn("slow").
    html('Settings Saved <span class="ktat_dismiss"><a title="dismiss this notification">x</a></span>').
    delay(500).
    fadeOut("slow");
}

function log_error(err) {
  if ( err.error ) {
    ktat_error = err.error;
  } else {
    ktat_error = JSON.stringify(err);
  }
  jQuery('div.ktat_loader').replaceWith("<h2 style='color:red'>Error: " + ktat_error + "</h2>");
}


  jQuery( "#ktat_enabled" ).change(function() {
    if (this.checked) {
      jQuery(".ktat_enabled_sub").show("slow");
    } else {
      jQuery(".ktat_enabled_sub:visible").hide("slow");;
    }
  });

  jQuery(document).on("click", ".ktat_steps_button", function(e) {
    e.preventDefault();
    var ktat_nonce = jQuery("#ktat_nonce").val();
    var theStep = jQuery(this).attr("data-id");

    if (theStep == "ktat_save_setting") {
      if (jQuery("#ktat_enable").is(":checked")) {
        ktat_enabled = 1;
      } else {
        ktat_enabled = 0;
      }
      var data = {
        action: "ktat_steps",
        sub_action: "ktat_save_setting",
        ktat_enabled: ktat_enabled,
        security: ktat_nonce
      };
      jQuery.post(ktat_localize_admin.ajaxurl, data, function(response) {
        try {
          response = jQuery.parseJSON(response);
          if (response.status !== false) {
            notifySettingsSaved();
          } else {
            console.log(response);
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
  });


  jQuery(document).on("click", ".ktat_dismiss", function() {
    var aj_nonce = jQuery("#ktat_nonce").val();
    jQuery("#ktat_notification").fadeOut("slow");
  });

