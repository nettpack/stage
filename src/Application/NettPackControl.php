<?php
/**
 * Author: Mykola Chomenko
 * Email: mykola.chomenko@dipcom.cz
 */

namespace NettPack\Stage\Application;

use Nette\Application\UI\Control;

class NettPackControl extends Control
{

	/**
	 * @var NettPack
	 */
	private $nettPack;

	public function __construct(NettPack $nettPack)
	{
		$this->nettPack = $nettPack;

		barDump($this->nettPack);
	}

	public function render()
	{
		$this->template->setFile(__DIR__ . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . 'js.latte');
		$this->template->nettpack = $this->nettPack;

		$this->template->render();
	}


}
