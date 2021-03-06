<?php
class ControllerExtension{class_folder_replace}{class_replace} extends Controller {
	private $error = array();

	public function index() {
		$this->load->language('extension/{folder_replace}/{replace}');

		$this->document->setTitle($this->language->get('heading_title'));

		$this->load->model('setting/setting');

		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
			$this->model_setting_setting->editSetting('{folder_replace}_{replace}', $this->request->post);

			$this->session->data['success'] = $this->language->get('text_success');

			$this->response->redirect($this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type={folder_replace}', true));
		}

		if (isset($this->error['warning'])) {
			$data['error_warning'] = $this->error['warning'];
		} else {
			$data['error_warning'] = '';
		}

		$data['breadcrumbs'] = array();

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('text_home'),
			'href' => $this->url->link('common/dashboard', 'user_token=' . $this->session->data['user_token'], true)
		);

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('text_extension'),
			'href' => $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type={folder_replace}', true)
		);

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('heading_title'),
			'href' => $this->url->link(`extension/{folder_replace}/{replace}`, 'user_token=' . $this->session->data['user_token'], true)
		);

		$data['action'] = $this->url->link('extension/{folder_replace}/{replace}', 'user_token=' . $this->session->data['user_token'], true);

		$data['cancel'] = $this->url->link('marketplace/extension', 'user_token=' . $this->session->data['user_token'] . '&type={folder_replace}', true);

		if (isset($this->request->post['{folder_replace}_{replace}_status'])) {
			$data['{folder_replace}_{replace}_status'] = $this->request->post['{folder_replace}_{replace}_status'];
		} else {
			$data['{folder_replace}_{replace}_status'] = $this->config->get('{folder_replace}_{replace}_status');
		}

		$data['header'] = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['footer'] = $this->load->controller('common/footer');

		$this->response->setOutput($this->load->view('extension/{folder_replace}/{replace}', $data));
	}

	protected function validate() {
		if (!$this->user->hasPermission('modify', 'extension/{folder_replace}/{replace}')) {
			$this->error['warning'] = $this->language->get('error_permission');
		}

		return !$this->error;
	}
}