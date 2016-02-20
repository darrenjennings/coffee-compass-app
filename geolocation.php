<?php

class JSON_API_Geolocation_Controller {

  public function hello_world() {
    return array(
      "message" => "Hello, world"
    );
  }

public function hello_person() {
  	global $json_api;
  	$id = $json_api->query->id;
	$posts = get_post_meta($id);
  	return $posts;
  }

  public function get_geo_data(){
$args = array(
    'meta_key' => '_wp_geo_latitude',
    'post_status' => 'any',
    'posts_per_page' => -1
);
$posts = get_posts($args);
foreach ( $posts as $key => $post ) {
    $posts[ $key ]->latitude = get_post_meta( $post->ID, '_wp_geo_latitude', true );
    $posts[ $key ]->longitude = get_post_meta( $post->ID, '_wp_geo_longitude', true );
}
return $posts;
	}

// Retrieve posts based on custom field key/value pair
public function get_custom_posts() {
  global $json_api;

  // Make sure we have key/value query vars
  if (!$json_api->query->key || !$json_api->query->value) {
    $json_api->error("Include a 'key' and 'value' query var.");
  }

  // See also: http://codex.wordpress.org/Template_Tags/query_posts
  $posts = $json_api->introspector->get_posts(array(
    'meta_key' => $json_api->query->key,
    'meta_value' => $json_api->query->value
  ));

  return array(
    'key' => $key,
    'value' => $value,
    'posts' => $posts
  );
}

}

?>

