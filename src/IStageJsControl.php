<?php

/**
 * Author: Radek Zíka
 * Email: radek.zika@dipcom.cz
 */

namespace NettPack\Stage;

interface IStageJsControl
{

	/**
	 * @return StageJsControl
	 */
	public function create(): StageJsControl;

}
