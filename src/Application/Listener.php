<?php
/**
 * Author: Mykola Chomenko
 * Email: mykola.chomenko@dipcom.cz
 */

namespace NettPack\Stage\Application;

use Doctrine\Common\Annotations\Reader;
use Kdyby\Events\Subscriber;
use Nette\Application\Application;
use Nette\Application\Helpers;
use Nette\Application\IResponse;
use Nette\Application\Request;
use Nette\Application\Responses\JsonResponse;
use Nette\Application\UI\Control;
use Nette\Application\UI\Presenter;
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

	public function onAnchor(Control $control)
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

		/**
		 * REDRAW SNIPPETS IF IS AJAX AND CONTROL WITH SAGAS HAS BEEN ANCHORED
		 */
		if ($control->getPresenter()->isAjax() && !empty($this->nettPack->getSnippetSagas())) {
			foreach ($this->nettPack->getSnippetSagas() as $saga) {
				$snippet = str_replace('snippet--', '', $saga['snippetName']);
				$control->getPresenter()->redrawControl($snippet);
			}
		}
	}

	public function onResponse(Application $application, IResponse $IResponse)
	{
		/** @var Presenter $presenter */
		$presenter = $application->getPresenter();
		if ($IResponse instanceof JsonResponse && $presenter->isAjax()) {
			/** @var Request $request */
			foreach ($application->getRequests() as $request) {
				$method = $request->getMethod();
				$saga = NULL;
				$sagasParameters = NULL;
				if ($method == 'POST') {
					if (isset($request->getPost()['saga'])) {
						$saga = $request->getPost()['saga'];
					}
					if (isset($request->getPost()['sagasParameters'])) {
						$sagasParameters = $request->getPost()['sagasParameters'];
					}
				} else {
					$saga = $request->getParameter('saga');
					$sagasParameters = $request->getParameter('sagasParameters');
				}
				if ($saga) {
					$this->nettPack->addSaga($saga);
				}
				if ($sagasParameters) {
					$decodeParameters = json_decode($sagasParameters);
					if (!is_array($decodeParameters) ) {
						continue;
					}

					foreach ($decodeParameters as $parameter) {
						if (!property_exists($parameter, 'name') || !property_exists($parameter, 'value')) {
							continue;
						}
						$this->nettPack->addSagasParameter($parameter->name, $parameter->value);
					}
				}
			}
			$payload = $IResponse->getPayload();
			if ($payload instanceof \stdClass) {
				$payload->nettpack = $this->nettPack->getPayload();
			}
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


        $action = $request->getParameter('action');
        if (!$action) {
            $action = "default";
        }
		$this->nettPack->setAction($action);
		$this->nettPack->setModule($module);
		$this->nettPack->setPresenter($presenterName);
	}

}
