<?php
/**
 * Author: Mykola Chomenko
 * Email: mykola.chomenko@dipcom.cz
 */

namespace NettPack\Stage\Annotations;

use Doctrine\Common\Annotations\Annotation;

/**
 * @Annotation
 * @Target("ANNOTATION")
 */
class SnippetSaga
{

	/**
	 * @var string
	 */
	public $snippet;

	/**
	 * @var string
	 */
	public $saga;

}
