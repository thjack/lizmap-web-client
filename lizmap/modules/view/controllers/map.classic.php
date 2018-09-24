<?php
/**
* Displays a full featured map based on one Qgis project.
* @package   lizmap
* @subpackage view
* @author    3liz
* @copyright 2011 3liz
* @link      http://3liz.com
* @license    Mozilla Public License : http://www.mozilla.org/MPL/
*/

include jApp::getModulePath('view').'controllers/lizMap.classic.php';

class mapCtrl extends lizMapCtrl {

    function index() {
        $rep = parent::index();

        // Get repository key
        $repository = $this->param('repository');
        // Get the project key
        $project = filter_var($this->param('project'), FILTER_SANITIZE_STRING);

        $url_params = array(
                        "repository"=>$repository,
                        "project"=>$project,
                      );
        // other map params
        if ( $this->param('layers') )
            $url_params['layers'] = $this->param('layers');
        if ( $this->param('bbox') )
            $url_params['bbox'] = $this->param('bbox');
        if ( $this->param('crs') )
            $url_params['crs'] = $this->param('crs');
        if ( $this->param('layerStyles') )
            $url_params['layerStyles'] = $this->param('layerStyles');


        if ( $rep->getType() === 'html' ) {
            $url_params['repository'] = $this->repositoryKey;
            $url_params['project'] = $this->projectKey;

            $rep->body->assign('auth_url_return', jUrl::get('view~map:index', $url_params));
            return $rep;
        }

        if ( $rep->getType() === 'redirect' && $rep->action === 'jcommunity~login:index' ) {
            $rep->params['auth_url_return'] = jUrl::get('view~map:index', $url_params);
        }

        return $rep;
    }
}
