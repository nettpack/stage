<?php
/**
 * Author: Mykola Chomenko
 * Email: mykola.chomenko@dipcom.cz
 */

namespace NettPack\Stage\Application;

use Doctrine\Common\Annotations\Reader;
use Kdyby\Events\Subscriber;
use Latte\Engine;
use Nette\Application\Application;
use Nette\Application\Helpers;
use Nette\Application\IResponse;
use Nette\Application\Request;
use Nette\Application\Responses\JsonResponse;
use Nette\Application\Responses\TextResponse;
use Nette\Application\UI\Control;
use Nette\Application\UI\ITemplateFactory;
use Nette\Application\UI\Presenter;
use Nette\Bridges\ApplicationLatte\Template;
use Nette\Bridges\ApplicationLatte\TemplateFactory;
use \NettPack\Stage\Annotations;

class Listener implements Subscriber
{

	/**
	 * @var NettPack
	 */
	private $nettPack;

	/**
	 * @var Reader
	 */
	private $reader;

	public function __construct(NettPack $nettPack, Reader $reader)
	{
		$this->nettPack = $nettPack;
		$this->reader = $reader;
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
			Application::class . '::onPresenter' => "request",
			Application::class . '::onResponse' => "onResponse",
			Control::class . "::onAnchor" => 'onAnchor'
		];
	}

	public function onAnchor($control)
	{
		$reflection = new \ReflectionClass($control);

		/** @var Annotations\NettPack $annotation */
		$annotation = $this->reader->getClassAnnotation($reflection, Annotations\NettPack::class);
		if ($annotation) {
			if ($annotation->sagaName) {
				$this->nettPack->addSaga($annotation->sagaName);
			}

			if ($annotation->snippetSagas) {
				/** @var Annotations\SnippetSaga $snippetSaga */
				foreach ($annotation->snippetSagas as $snippetSaga) {
					$this->nettPack->addSnippetSaga($snippetSaga->saga, $snippetSaga->snippet);
				}
			}
		}
	}

	public function onResponse(Application $application, IResponse $IResponse)
	{
		if ($IResponse instanceof JsonResponse) {

			/** @var Request $request */
			foreach ($application->getRequests() as $request) {
				$method = $request->getMethod();
				if ($method == 'POST' && isset($request->getPost()['saga'])) {
					$saga = $request->getPost()['saga'];
				} else {
					$saga = $request->getParameter('saga');
				}
				if ($saga) {
					$this->nettPack->addSaga($saga);
				}
			}


			$payload = $IResponse->getPayload();
			$payload->nettpack = $this->nettPack->getPayload();
		}
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
