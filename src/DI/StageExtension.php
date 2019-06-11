<?php
/**
 * Author: Mykola Chomenko
 * Email: mykola.chomenko@dipcom.cz
 */

namespace NettPack\Stage\DI;

use NettPack\Stage\Application\INettPackControl;
use NettPack\Stage\Application\Listener;
use Kdyby\Events\DI\EventsExtension;
use Nette\Configurator;
use Nette\DI\Compiler;
use Nette\DI\CompilerExtension;
use NettPack\Stage\Application\NettPack;

class StageExtension extends CompilerExtension
{

	public function loadConfiguration()
	{
		$builder = $this->getContainerBuilder();

		$builder->addDefinition($this->prefix("application.listener"))
			->setFactory(Listener::class)
			->addTag(EventsExtension::TAG_SUBSCRIBER);

		$builder->addDefinition($this->prefix("application.nettpack"))
			->setFactory(NettPack::class);

		$builder->addDefinition($this->prefix("application.nettpackControl"))
			->setImplement(INettPackControl::class)
			->setInject(TRUE);

	}

	public function beforeCompile()
	{


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
