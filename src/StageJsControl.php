<?php

/**
 * Author: Radek Zíka
 * Email: radek.zika@dipcom.cz
 */

namespace NettPack\Stage;

use Nette\Application\Helpers;
use Nette\Application\UI\Control;

class StageJsControl extends Control
{

	public function render()
	{
		$this->template->setFile(__DIR__ . '/templates/js.latte');
		$this->template->stagingData = $this->createStagingData();
		$this->template->render();
	}

	/**
	 * @return array
	 */
	private function createStagingData()
	{
		list($module, $presenter) = Helpers::splitName($this->getPresenter()->getName());
		return [
			'module' => $module,
			'control' => $presenter,
			'action' => $this->getPresenter()->getAction(),
		];
	}

}
