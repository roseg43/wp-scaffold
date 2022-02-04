<?php
/**
 * Example block markup
 *
 * @package TenUpScaffold\Blocks\Example
 *
 * @var array $args {
 *     $args is provided by get_template_part.
 *
 *     @type array $attributes Block attributes.
 *     @type array $content    Block content.
 *     @type array $block      Block instance.
 * }
 */

// Set defaults.
$args = wp_parse_args(
	$args,
	[
		'attributes' => [
			'showAvatar' => true,
		],
		'class_name' => 'wp-block-tenup-author-byline',
	]
);

$author_name = get_the_author();
$author_id = get_the_author_meta('ID');
$author_gravatar_url = get_avatar_url($author_id, ['size' => 96]);

?>
<div class="<?php echo esc_attr( $args['class_name'] ); ?>">
	<figure class="wp-block-tenup-author-byline__gravatar wp-block-image is-style-rounded">
		<img
			src="<?php echo esc_attr( $author_gravatar_url ); ?>"
			alt="Gravatar of <?php esc_attr( $author_name ); ?>"
			width="96"
			height="96"
		/>
	</figure>
	<h3 class="wp-block-tenup-author-byline__author-name"><?php echo __( $author_name ); ?></h3>
</div>
