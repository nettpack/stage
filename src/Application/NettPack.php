<?php
/**
 * Author: Mykola Chomenko
 * Email: mykola.chomenko@dipcom.cz
 */

namespace NettPack\Stage\Application;

class NettPack
{

	/**
	 * @var string
	 */
	private $module;

	/**
	 * @var string
	 */
	private $presenter;

	/**
	 * @var string
	 */
	private $action;

	/**
	 * @var array
	 */
	private $sagas = [];

	/**
	 * @return string
	 */
	public function getModule(): string
	{
		return $this->module;
	}

	/**
	 * @param string $module
	 * @return $this
	 */
	public function setModule($module)
	{
		$this->module = $module;
		return $this;
	}

	/**
	 * @return string
	 */
	public function getPresenter(): string
	{
		return $this->presenter;
	}

	/**
	 * @param string $presenter
	 * @return $this
	 */
	public function setPresenter($presenter)
	{
		$this->presenter = $presenter;
		return $this;
	}

	/**
	 * @return string
	 */
	public function getAction(): string
	{
		return $this->action;
	}

	/**
	 * @param string $action
	 * @return $this
	 */
	public function setAction($action)
	{
		$this->action = $action;
		return $this;
	}

	/**
	 * @return array
	 */
	public function getSagas(): array
	{
		return $this->sagas;
	}

	/**
	 * @param string $saga
	 * @return $this
	 */
	public function addSaga(string $saga)
	{
		$this->sagas[] = $saga;
		return $this;
	}

}
