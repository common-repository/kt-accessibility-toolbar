<?php
if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

$site_url = trailingslashit(get_site_url());
$ktat_enable = get_option('ktat_enable', 0);
$ktat_enabled_checked = ($ktat_enable == 1) ? ' checked="checked"' : '';
?>
<div class="wrap aj">
	<div id="ktat_notification"></div>
	<input type="hidden" id="ktat_nonce" value="<?php esc_attr_e(wp_create_nonce( "ktat_nonce" )); ?>" />
	<div class="asItemDetail">
	    <h3><?php esc_attr_e(KTAT_TITLE); ?></h3>
	    <p>
	        <label><?php esc_html_e('Enable Toolbar '); ?>?</label>
	        <input type="checkbox" name="ktat_enable" id="ktat_enable" value="1" <?php esc_attr_e($ktat_enabled_checked); ?> />
	    </p>
	</div>
	<p>
		<button data-id="ktat_save_setting" class="ktat_steps_button button">
			<?php esc_html_e('Save Setting', 'accessibility-toolbar'); ?>		
		</button>
	</p>
</div>
