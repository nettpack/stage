<?php
/**
 * Author: Mykola Chomenko
 * Email: mykola.chomenko@dipcom.cz
 */

namespace NettPack\Stage\Application;

interface INettPackLoaderControl
{

	/**
	 * @return NettPackLoaderControl
	 */
	public function create(): NettPackLoaderControl;

}
