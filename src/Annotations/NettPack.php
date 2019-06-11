<?php
/**
 * Author: Mykola Chomenko
 * Email: mykola.chomenko@dipcom.cz
 */

namespace NettPack\Stage\Annotations;

use Doctrine\Common\Annotations\Annotation;

/**
 * @Annotation
 * @Target("CLASS")
 */
class NettPack
{

	/**
	 * @var string
	 */
	public $sagaName;

	/**
	 * @var array<\NettPack\Stage\Annotations\SnippetSaga>
	 */
	public $snippetSagas;

}
