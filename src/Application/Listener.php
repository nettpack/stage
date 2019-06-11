<?php
/**
 * Author: Mykola Chomenko
 * Email: mykola.chomenko@dipcom.cz
 */

namespace NettPack\Stage\Application;

use Kdyby\Events\Subscriber;
use Latte\Engine;
use Nette\Application\Application;
use Nette\Application\Helpers;
use Nette\Application\UI\ITemplateFactory;
use Nette\Application\UI\Presenter;
use Nette\Bridges\ApplicationLatte\Template;
use Nette\Bridges\ApplicationLatte\TemplateFactory;

class Listener implements Subscriber
{

	/**
	 * @var NettPack
	 */
	private $nettPack;

	public function __construct(NettPack $nettPack)
	{
		$this->nettPack = $nettPack;
	}

	/**
	 * @return array|string[]
	 */
	public function getSubscribedEvents()
	{
		if (php_sapi_name() == "cli") {
			return [];
		}
		return [
			Application::class . '::onPresenter' => "request"
		];
	}

	/**
	 * @param Application $application
	 * @param Presenter $presenter
	 */
	public function request(Application $application, Presenter $presenter): void
	{
		$requests = $application->getRequests();
		$request = end($requests);

		list($module, $presenterName) = Helpers::splitName($request->getPresenterName());

		$this->nettPack->setAction($request->getParameter('action'));
		$this->nettPack->setModule($module);
		$this->nettPack->setPresenter($presenterName);
	}

}
