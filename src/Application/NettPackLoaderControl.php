<?php
/**
 * Author: Mykola Chomenko
 * Email: mykola.chomenko@dipcom.cz
 */

namespace NettPack\Stage\Application;

use Nette\Application\UI\Control;

class NettPackLoaderControl extends Control
{

	/**
	 * @var array
	 */
	private $config;

	/**
	 * @var NettPack
	 */
	private $nettPack;

	public function __construct($config, NettPack $nettPack)
	{
		$this->config = $config;
		$this->nettPack = $nettPack;
	}

	public function render()
	{
		$hashes = [];
		$hashFile = $this->config['hashFile'];
		if (file_exists($hashFile)) {
			$hashes = json_decode(file_get_contents($hashFile));
		}
		$this->template->setFile(__DIR__ . '/templates/loader.latte');
		$this->template->hashes = $hashes;
		$this->template->currentModule = strtolower($this->nettPack->getModule());
		$this->template->render();
	}

}
