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
	 * @var array
	 */
	private $sagasParameters = [];

	/**
	 * @var array
	 */
	private $snippetSagas = [];

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

	/**
	 * @return array
	 */
	public function getPayload()
	{
		return [
			'action' => [
				'module' => $this->getModule(),
				'presenter' => $this->getPresenter(),
				'action' => $this->getAction(),
				'sagas' => $this->getSagas(),
				'sagasParameters' => $this->getSagasParameters(),
				'snippetSagas' => $this->getSnippetSagas(),
			],
		];
	}

	/**
	 * @param string $name
	 * @param string $snippetName
	 */
	public function addSnippetSaga(string $name, string $snippetName)
	{
		$this->snippetSagas[] = [
			'name' => $name,
			'snippetName' => $snippetName,
		];
	}

	/**
	 * @return array
	 */
	public function getSnippetSagas(): array
	{
		return $this->snippetSagas;
	}

	/**
	 * @return array
	 */
	public function getSagasParameters(): array
	{
		return $this->sagasParameters;
	}

	/**
	 * @param string $name
	 * @param $value
	 * @return $this
	 */
	public function addSagasParameter(string $name, $value)
	{
		$this->sagasParameters[$name] = $value;
		return $this;
	}

}
