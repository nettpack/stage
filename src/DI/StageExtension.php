<?php
/**
 * Author: Mykola Chomenko
 * Email: mykola.chomenko@dipcom.cz
 */

namespace NettPack\Stage\DI;

use NettPack\Stage\Application\INettPackControl;
use NettPack\Stage\Application\INettPackLoaderControl;
use NettPack\Stage\Application\Listener;
use Kdyby\Events\DI\EventsExtension;
use Nette\Configurator;
use Nette\DI\Compiler;
use Nette\DI\CompilerExtension;
use NettPack\Stage\Application\NettPack;
use NettPack\Stage\Application\NettPackLoaderControl;

class StageExtension extends CompilerExtension
{

	private $defaultConfig = [
		'hashFile' => NULL,
	];

	public function loadConfiguration()
	{
		$builder = $this->getContainerBuilder();
		if ($this->defaultConfig["hashFile"] === NULL && isset($builder->parameters["wwwDir"])) {
			$this->defaultConfig["hashFile"] = $builder->parameters["wwwDir"] . "/../webpack.hashes.js";
		}

		$config = $this->getConfig($this->defaultConfig);

		$builder->addDefinition($this->prefix("application.listener"))
			->setFactory(Listener::class)
			->addTag(EventsExtension::TAG_SUBSCRIBER);

		$builder->addDefinition($this->prefix("application.nettpack"))
			->setFactory(NettPack::class);

		$builder->addDefinition($this->prefix("application.nettpackControl"))
			->setImplement(INettPackControl::class)
			->setInject(TRUE);

		$builder->addDefinition($this->prefix("application.nettpackLoaderControl"))
			->setImplement(INettPackLoaderControl::class)
			->setFactory(NettPackLoaderControl::class, ['config' => $config])
			->setInject(TRUE);
	}

	/**
	 * @param Configurator $configurator
	 */
	public static function register(Configurator $configurator)
	{
		$configurator->onCompile[] = function ($config, Compiler $compiler) {
			$compiler->addExtension('StageExtension', new StageExtension());
		};
	}

}
