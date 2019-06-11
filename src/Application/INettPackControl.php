<?php
/**
 * Author: Mykola Chomenko
 * Email: mykola.chomenko@dipcom.cz
 */

namespace NettPack\Stage\Application;

interface INettPackControl
{

	/**
	 * @return NettPackControl
	 */
	public function create(): NettPackControl;

}
