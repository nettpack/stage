<?php

/**
 * Author: Radek Zíka
 * Email: radek.zika@dipcom.cz
 */

namespace NettPack\Stage;

trait NettPackStageTrait
{

	/**
	 * @var IStageJsControl @inject
	 */
	public $nettPackStageControl;

	/**
	 * @return StageJsControl
	 */
	public function createComponentNettPackStageJs()
	{
		return $this->nettPackStageControl->create();
	}

}
