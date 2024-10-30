<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

class KTAT_Admin {
    function __construct() { 
        define( 'KTAT_VERSION', '1.0');          
        define( 'KTAT_ADMIN_URL', trailingslashit( admin_url() ) );   
        define( 'KTAT_PLUGIN_DIR', trailingslashit( plugin_dir_path( __FILE__ ) ) );
        add_filter( 'plugin_action_links_'.plugin_basename( 'kt-accessibility-toolbar/accessibility.php' ), array( $this, 'ktat_setmeta' ), 10, 2 );
        add_action( 'plugins_loaded', array( $this, 'ktat_admin_init' ) );
    }

    /**
     * the plugin instance
     *
     */
    private static $instance = NULL;

    public static function get_instance() {
        if ( NULL === self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    public static function ktat_activate() {

    }

    public static function ktat_deactivate() {

    }

    public function ktat_enqueue_scripts() {
        wp_enqueue_style('ktat_admin_styles', plugins_url( '/css/admin.css', __FILE__ ));
    	wp_enqueue_script('ktat_admin_scripts',plugins_url( '/js/admin.js', __FILE__ ), KTAT_VERSION, true);

        // ajaxy stuff
        $ktat_localize = array(
            'ajaxurl' => admin_url( 'admin-ajax.php' ),
            'siteurl' => get_site_url(),
            'pluginurl' => KTAT_PLUGIN_URL,
            'ajadminurl' => admin_url( 'options-general.php?page=accessibility' )
        );
        wp_localize_script( 'ktat_admin_scripts', 'ktat_localize_admin', $ktat_localize );
    }

    public function ktat_admin_init() {
        global $wp, $wpdb;
        register_activation_hook( __FILE__, array( $this, 'ktat_activate' ) );
        register_deactivation_hook( __FILE__, array( $this, 'ktat_deactivate' ) );

        add_action( 'admin_menu', array( $this, 'ktat_menu' ) );
        add_action( 'wp_ajax_ktat_steps', array( $this, 'ktat_data_save' ) );
    }

    public function ktat_menu() {
        $ktat_pages = add_submenu_page(
            'options-general.php',
            KTAT_TITLE . ' Admin',
            KTAT_TITLE,
            'manage_options',
            'accessibility',
            array( $this, 'ktat_admin_menu' )
        );
        add_action( 'admin_print_scripts-'.$ktat_pages, array( $this, 'ktat_enqueue_scripts' ) );
    }

    public function ktat_data_save() {
        $sub_action = sanitize_text_field( $_POST['sub_action'] );
        switch ( $sub_action ) {
            case 'ktat_save_setting':
            $ktat_enable = sanitize_text_field( $_POST['ktat_enabled'] );
            update_option( 'ktat_enable', $ktat_enable );
            $return['status'] = true;
            break;
        }
    }

    function ktat_admin_menu() {
        require_once('admin/Settingpage.php');
    }
    
    function ktat_setmeta($links, $file = null)
    {
        static $plugin;
        if ( empty( $plugin ) ) {
            $plugin = plugin_basename( KTAT_PLUGIN_DIR . 'accessibility.php' );
        }

        if ( $file === $plugin ) {
            $newlink = array( sprintf( '<a href="options-general.php?page=accessibility">%s</a>', __( 'Settings' ) ) );
            $links = array_merge( $newlink, $links );
        }
        return $links;
    }

}
