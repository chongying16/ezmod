<?php
class ModelExtension{class_folder_replace}{class_replace} extends Model {
		
	public function install() {
		$query = $this->db->query("SELECT DISTINCT layout_id FROM " . DB_PREFIX . "layout_route WHERE route = 'product/product' OR route LIKE 'checkout/%'");
		
		$layouts = $query->rows;
		
		foreach ($layouts as $layout) {
			$this->db->query("INSERT INTO " . DB_PREFIX . "layout_module SET layout_id = '" . (int)$layout['layout_id'] . "', code = '{replace}', position = 'content_top', sort_order = '0'");
		}
	}
}