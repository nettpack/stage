<?php

/**
 * Author: Radek Zíka
 * Email: radek.zika@dipcom.cz
 */

namespace NettPack\Stage\Application;

trait NettpackTrait
{

	/** @var INettPackLoaderControl @inject */
	public $nettpackLoader;

	/**
	 * @return NettPackLoaderControl
	 */
	public function createComponentNettpackLoader()
	{
		return $this->nettpackLoader->create();
	}

	/** @var INettPackControl @inject */
	public $nettpackControl;

	public function createComponentNettpackControl()
	{
		return $this->nettpackControl->create();
	}

}
