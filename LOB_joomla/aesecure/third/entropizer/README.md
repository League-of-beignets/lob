



<!DOCTYPE html>
<html lang="en" class="">
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# object: http://ogp.me/ns/object# article: http://ogp.me/ns/article# profile: http://ogp.me/ns/profile#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Language" content="en">
    
    
    <title>jquery-entropizer/README.md at master · jreesuk/jquery-entropizer</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub">
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub">
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-114.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-144.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144.png">
    <meta property="fb:app_id" content="1401488693436528">

      <meta content="@github" name="twitter:site" /><meta content="summary" name="twitter:card" /><meta content="jreesuk/jquery-entropizer" name="twitter:title" /><meta content="jquery-entropizer - jQuery password meter plugin" name="twitter:description" /><meta content="https://avatars1.githubusercontent.com/u/7661254?v=2&amp;s=400" name="twitter:image:src" />
<meta content="GitHub" property="og:site_name" /><meta content="object" property="og:type" /><meta content="https://avatars1.githubusercontent.com/u/7661254?v=2&amp;s=400" property="og:image" /><meta content="jreesuk/jquery-entropizer" property="og:title" /><meta content="https://github.com/jreesuk/jquery-entropizer" property="og:url" /><meta content="jquery-entropizer - jQuery password meter plugin" property="og:description" />

      <meta name="browser-stats-url" content="/_stats">
    <link rel="assets" href="https://assets-cdn.github.com/">
    <link rel="conduit-xhr" href="https://ghconduit.com:25035">
    <link rel="xhr-socket" href="/_sockets">
    <meta name="pjax-timeout" content="1000">

    <meta name="msapplication-TileImage" content="/windows-tile.png">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="selected-link" value="repo_source" data-pjax-transient>
      <meta name="google-analytics" content="UA-3769691-2">

    <meta content="collector.githubapp.com" name="octolytics-host" /><meta content="collector-cdn.github.com" name="octolytics-script-host" /><meta content="github" name="octolytics-app-id" /><meta content="C1BFD437:09A1:22082DB:5440F31A" name="octolytics-dimension-request_id" /><meta content="355999" name="octolytics-actor-id" /><meta content="cavo789" name="octolytics-actor-login" /><meta content="37c02f3ca1b11b2e5901870e223e29e2218c521b7c84e0d97e97c0d49ab8a653" name="octolytics-actor-hash" />
    
    <meta content="Rails, view, blob#show" name="analytics-event" />

    
    
    <link rel="icon" type="image/x-icon" href="https://assets-cdn.github.com/favicon.ico">


    <meta content="authenticity_token" name="csrf-param" />
<meta content="M1+5/CUzLOIpPP/ghRzqsczFUT58eLylDRwS0c2Ts979E/PRqJNGJSjtEZ0btoOyrWLGYRcmo+t6KQEmNth+Hw==" name="csrf-token" />

    <link href="https://assets-cdn.github.com/assets/github-70d73ee874849f7ef47d397ee1ba2e462a8e8ad53be6d7c38ef36b6d361624f8.css" media="all" rel="stylesheet" type="text/css" />
    <link href="https://assets-cdn.github.com/assets/github2-8be33074433d72290ce4ed6e379494f04da2b3e0f94336f6617f816f195be03b.css" media="all" rel="stylesheet" type="text/css" />
    
    


    <meta http-equiv="x-pjax-version" content="2b284dfdc714d3a952c4a9eb4af58566">

      
  <meta name="description" content="jquery-entropizer - jQuery password meter plugin">
  <meta name="go-import" content="github.com/jreesuk/jquery-entropizer git https://github.com/jreesuk/jquery-entropizer.git">

  <meta content="7661254" name="octolytics-dimension-user_id" /><meta content="jreesuk" name="octolytics-dimension-user_login" /><meta content="20161279" name="octolytics-dimension-repository_id" /><meta content="jreesuk/jquery-entropizer" name="octolytics-dimension-repository_nwo" /><meta content="true" name="octolytics-dimension-repository_public" /><meta content="false" name="octolytics-dimension-repository_is_fork" /><meta content="20161279" name="octolytics-dimension-repository_network_root_id" /><meta content="jreesuk/jquery-entropizer" name="octolytics-dimension-repository_network_root_nwo" />
  <link href="https://github.com/jreesuk/jquery-entropizer/commits/master.atom" rel="alternate" title="Recent Commits to jquery-entropizer:master" type="application/atom+xml">

  </head>


  <body class="logged_in  env-production windows vis-public page-blob">
    <a href="#start-of-content" tabindex="1" class="accessibility-aid js-skip-to-content">Skip to content</a>
    <div class="wrapper">
      
      
      
      


      <div class="header header-logged-in true" role="banner">
  <div class="container clearfix">

    <a class="header-logo-invertocat" href="https://github.com/" data-hotkey="g d" aria-label="Homepage" ga-data-click="Header, go to dashboard, icon:logo">
  <span class="mega-octicon octicon-mark-github"></span>
</a>


      <div class="site-search repo-scope js-site-search" role="search">
          <form accept-charset="UTF-8" action="/jreesuk/jquery-entropizer/search" class="js-site-search-form" data-global-search-url="/search" data-repo-search-url="/jreesuk/jquery-entropizer/search" method="get"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /></div>
  <input type="text"
    class="js-site-search-field is-clearable"
    data-hotkey="s"
    name="q"
    placeholder="Search"
    data-global-scope-placeholder="Search GitHub"
    data-repo-scope-placeholder="Search"
    tabindex="1"
    autocapitalize="off">
  <div class="scope-badge">This repository</div>
</form>
      </div>
      <ul class="header-nav left" role="navigation">
        <li class="header-nav-item explore">
          <a class="header-nav-link" href="/explore" data-ga-click="Header, go to explore, text:explore">Explore</a>
        </li>
          <li class="header-nav-item">
            <a class="header-nav-link" href="https://gist.github.com" data-ga-click="Header, go to gist, text:gist">Gist</a>
          </li>
          <li class="header-nav-item">
            <a class="header-nav-link" href="/blog" data-ga-click="Header, go to blog, text:blog">Blog</a>
          </li>
        <li class="header-nav-item">
          <a class="header-nav-link" href="https://help.github.com" data-ga-click="Header, go to help, text:help">Help</a>
        </li>
      </ul>

    
<ul class="header-nav user-nav right" id="user-links">
  <li class="header-nav-item dropdown js-menu-container">
    <a class="header-nav-link name" href="/cavo789" data-ga-click="Header, go to profile, text:username">
      <img alt="Christophe" class="avatar" data-user="355999" height="20" src="https://avatars0.githubusercontent.com/u/355999?v=2&amp;s=40" width="20" />
      <span class="css-truncate">
        <span class="css-truncate-target">cavo789</span>
      </span>
    </a>
  </li>

  <li class="header-nav-item dropdown js-menu-container">
    <a class="header-nav-link js-menu-target tooltipped tooltipped-s" href="#" aria-label="Create new..." data-ga-click="Header, create new, icon:add">
      <span class="octicon octicon-plus"></span>
      <span class="dropdown-caret"></span>
    </a>

    <div class="dropdown-menu-content js-menu-content">
      
<ul class="dropdown-menu">
  <li>
    <a href="/new"><span class="octicon octicon-repo"></span> New repository</a>
  </li>
  <li>
    <a href="/organizations/new"><span class="octicon octicon-organization"></span> New organization</a>
  </li>


    <li class="dropdown-divider"></li>
    <li class="dropdown-header">
      <span title="jreesuk/jquery-entropizer">This repository</span>
    </li>
      <li>
        <a href="/jreesuk/jquery-entropizer/issues/new"><span class="octicon octicon-issue-opened"></span> New issue</a>
      </li>
</ul>

    </div>
  </li>

  <li class="header-nav-item">
        <a href="/notifications" aria-label="You have no unread notifications" class="header-nav-link notification-indicator tooltipped tooltipped-s" data-ga-click="Header, go to notifications, icon:read" data-hotkey="g n">
        <span class="mail-status all-read"></span>
        <span class="octicon octicon-inbox"></span>
</a>
  </li>

  <li class="header-nav-item">
    <a class="header-nav-link tooltipped tooltipped-s" href="/settings/profile" id="account_settings" aria-label="Settings" data-ga-click="Header, go to settings, icon:settings">
      <span class="octicon octicon-gear"></span>
    </a>
  </li>

  <li class="header-nav-item">
    <form accept-charset="UTF-8" action="/logout" class="logout-form" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="hjhivp1/zRpNUb3TU8Sj49v1TiCZdbBYzFrrsOaZjWSkyBOVfQzv7kmA93vrdu++D4cc+oin8CxV2g3g9Dk8uA==" /></div>
      <button class="header-nav-link sign-out-button tooltipped tooltipped-s" aria-label="Sign out" data-ga-click="Header, sign out, icon:logout">
        <span class="octicon octicon-sign-out"></span>
      </button>
</form>  </li>

</ul>


    
  </div>
</div>

      

        


      <div id="start-of-content" class="accessibility-aid"></div>
          <div class="site" itemscope itemtype="http://schema.org/WebPage">
    <div id="js-flash-container">
      
    </div>
    <div class="pagehead repohead instapaper_ignore readability-menu">
      <div class="container">
        
<ul class="pagehead-actions">

    <li class="subscription">
      <form accept-charset="UTF-8" action="/notifications/subscribe" class="js-social-container" data-autosubmit="true" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="5q+zlAsMrAgZRXdNfTaR/emtlVn5fFu2GKq2JEW3WZL9Tt/EIzGKcQDbRsJLeahYsy9cv0GnNIADq0yZ7K5LzQ==" /></div>  <input id="repository_id" name="repository_id" type="hidden" value="20161279" />

    <div class="select-menu js-menu-container js-select-menu">
      <a class="social-count js-social-count" href="/jreesuk/jquery-entropizer/watchers">
        1
      </a>
      <a href="/jreesuk/jquery-entropizer/subscription"
        class="minibutton select-menu-button with-count js-menu-target" role="button" tabindex="0" aria-haspopup="true">
        <span class="js-select-button">
          <span class="octicon octicon-eye"></span>
          Watch
        </span>
      </a>

      <div class="select-menu-modal-holder">
        <div class="select-menu-modal subscription-menu-modal js-menu-content" aria-hidden="true">
          <div class="select-menu-header">
            <span class="select-menu-title">Notifications</span>
            <span class="octicon octicon-x js-menu-close" role="button" aria-label="Close"></span>
          </div> <!-- /.select-menu-header -->

          <div class="select-menu-list js-navigation-container" role="menu">

            <div class="select-menu-item js-navigation-item selected" role="menuitem" tabindex="0">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input checked="checked" id="do_included" name="do" type="radio" value="included" />
                <h4>Not watching</h4>
                <span class="description">Be notified when participating or @mentioned.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-eye"></span>
                  Watch
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

            <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
              <span class="select-menu-item-icon octicon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input id="do_subscribed" name="do" type="radio" value="subscribed" />
                <h4>Watching</h4>
                <span class="description">Be notified of all conversations.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-eye"></span>
                  Unwatch
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

            <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input id="do_ignore" name="do" type="radio" value="ignore" />
                <h4>Ignoring</h4>
                <span class="description">Never be notified.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-mute"></span>
                  Stop ignoring
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

          </div> <!-- /.select-menu-list -->

        </div> <!-- /.select-menu-modal -->
      </div> <!-- /.select-menu-modal-holder -->
    </div> <!-- /.select-menu -->

</form>
    </li>

  <li>
    
  <div class="js-toggler-container js-social-container starring-container ">

    <form accept-charset="UTF-8" action="/jreesuk/jquery-entropizer/unstar" class="js-toggler-form starred js-unstar-button" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="TVWsgMgbqjnI/p/D5LNfWrTSZUHBowjg4hvxXcqJYJoRa+Lxtwi/lHeVA3fgbnoxSvAfYapn1yjQMgAQwpfZ9g==" /></div>
      <button
        class="minibutton with-count js-toggler-target star-button"
        aria-label="Unstar this repository" title="Unstar jreesuk/jquery-entropizer">
        <span class="octicon octicon-star"></span>
        Unstar
      </button>
        <a class="social-count js-social-count" href="/jreesuk/jquery-entropizer/stargazers">
          2
        </a>
</form>
    <form accept-charset="UTF-8" action="/jreesuk/jquery-entropizer/star" class="js-toggler-form unstarred js-star-button" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="sooZRvyBersqp0Bzs/7WSCMHohA56nyuvofEkKNAF0WgqxV0ZZNxFD1fJEt4vt2Tzpkdr/myKVGMUg8Ma+VSRA==" /></div>
      <button
        class="minibutton with-count js-toggler-target star-button"
        aria-label="Star this repository" title="Star jreesuk/jquery-entropizer">
        <span class="octicon octicon-star"></span>
        Star
      </button>
        <a class="social-count js-social-count" href="/jreesuk/jquery-entropizer/stargazers">
          2
        </a>
</form>  </div>

  </li>


        <li>
          <a href="/jreesuk/jquery-entropizer/fork" class="minibutton with-count js-toggler-target fork-button tooltipped-n" title="Fork your own copy of jreesuk/jquery-entropizer to your account" aria-label="Fork your own copy of jreesuk/jquery-entropizer to your account" rel="nofollow" data-method="post">
            <span class="octicon octicon-repo-forked"></span>
            Fork
          </a>
          <a href="/jreesuk/jquery-entropizer/network" class="social-count">1</a>
        </li>

</ul>

        <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title public">
          <span class="mega-octicon octicon-repo"></span>
          <span class="author"><a href="/jreesuk" class="url fn" itemprop="url" rel="author"><span itemprop="title">jreesuk</span></a></span><!--
       --><span class="path-divider">/</span><!--
       --><strong><a href="/jreesuk/jquery-entropizer" class="js-current-repository js-repo-home-link">jquery-entropizer</a></strong>

          <span class="page-context-loader">
            <img alt="" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
          </span>

        </h1>
      </div><!-- /.container -->
    </div><!-- /.repohead -->

    <div class="container">
      <div class="repository-with-sidebar repo-container new-discussion-timeline  ">
        <div class="repository-sidebar clearfix">
            
<div class="sunken-menu vertical-right repo-nav js-repo-nav js-sidenav-container-pjax js-octicon-loaders" role="navigation" data-issue-count-url="/jreesuk/jquery-entropizer/issues/counts" data-pjax-container-selector="#js-repo-pjax-container">
  <div class="sunken-menu-contents">
    <ul class="sunken-menu-group">
      <li class="tooltipped tooltipped-w" aria-label="Code">
        <a href="/jreesuk/jquery-entropizer" aria-label="Code" class="selected js-selected-navigation-item sunken-menu-item" data-hotkey="g c" data-pjax="true" data-selected-links="repo_source repo_downloads repo_commits repo_releases repo_tags repo_branches /jreesuk/jquery-entropizer">
          <span class="octicon octicon-code"></span> <span class="full-word">Code</span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

        <li class="tooltipped tooltipped-w" aria-label="Issues">
          <a href="/jreesuk/jquery-entropizer/issues" aria-label="Issues" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-hotkey="g i" data-selected-links="repo_issues repo_labels repo_milestones /jreesuk/jquery-entropizer/issues">
            <span class="octicon octicon-issue-opened"></span> <span class="full-word">Issues</span>
            <span class="js-issue-replace-counter"></span>
            <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>        </li>

      <li class="tooltipped tooltipped-w" aria-label="Pull Requests">
        <a href="/jreesuk/jquery-entropizer/pulls" aria-label="Pull Requests" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-hotkey="g p" data-selected-links="repo_pulls /jreesuk/jquery-entropizer/pulls">
            <span class="octicon octicon-git-pull-request"></span> <span class="full-word">Pull Requests</span>
            <span class="js-pull-replace-counter"></span>
            <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>


        <li class="tooltipped tooltipped-w" aria-label="Wiki">
          <a href="/jreesuk/jquery-entropizer/wiki" aria-label="Wiki" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-hotkey="g w" data-selected-links="repo_wiki /jreesuk/jquery-entropizer/wiki">
            <span class="octicon octicon-book"></span> <span class="full-word">Wiki</span>
            <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>        </li>
    </ul>
    <div class="sunken-menu-separator"></div>
    <ul class="sunken-menu-group">

      <li class="tooltipped tooltipped-w" aria-label="Pulse">
        <a href="/jreesuk/jquery-entropizer/pulse/weekly" aria-label="Pulse" class="js-selected-navigation-item sunken-menu-item" data-pjax="true" data-selected-links="pulse /jreesuk/jquery-entropizer/pulse/weekly">
          <span class="octicon octicon-pulse"></span> <span class="full-word">Pulse</span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

      <li class="tooltipped tooltipped-w" aria-label="Graphs">
        <a href="/jreesuk/jquery-entropizer/graphs" aria-label="Graphs" class="js-selected-navigation-item sunken-menu-item" data-pjax="true" data-selected-links="repo_graphs repo_contributors /jreesuk/jquery-entropizer/graphs">
          <span class="octicon octicon-graph"></span> <span class="full-word">Graphs</span>
          <img alt="" class="mini-loader" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>
    </ul>


  </div>
</div>

              <div class="only-with-full-nav">
                
  
<div class="clone-url open"
  data-protocol-type="http"
  data-url="/users/set_protocol?protocol_selector=http&amp;protocol_type=clone">
  <h3><span class="text-emphasized">HTTPS</span> clone URL</h3>
  <div class="input-group">
    <input type="text" class="input-mini input-monospace js-url-field"
           value="https://github.com/jreesuk/jquery-entropizer.git" readonly="readonly">
    <span class="input-group-button">
      <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="https://github.com/jreesuk/jquery-entropizer.git" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
    </span>
  </div>
</div>

  
<div class="clone-url "
  data-protocol-type="ssh"
  data-url="/users/set_protocol?protocol_selector=ssh&amp;protocol_type=clone">
  <h3><span class="text-emphasized">SSH</span> clone URL</h3>
  <div class="input-group">
    <input type="text" class="input-mini input-monospace js-url-field"
           value="git@github.com:jreesuk/jquery-entropizer.git" readonly="readonly">
    <span class="input-group-button">
      <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="git@github.com:jreesuk/jquery-entropizer.git" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
    </span>
  </div>
</div>

  
<div class="clone-url "
  data-protocol-type="subversion"
  data-url="/users/set_protocol?protocol_selector=subversion&amp;protocol_type=clone">
  <h3><span class="text-emphasized">Subversion</span> checkout URL</h3>
  <div class="input-group">
    <input type="text" class="input-mini input-monospace js-url-field"
           value="https://github.com/jreesuk/jquery-entropizer" readonly="readonly">
    <span class="input-group-button">
      <button aria-label="Copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="https://github.com/jreesuk/jquery-entropizer" data-copied-hint="Copied!" type="button"><span class="octicon octicon-clippy"></span></button>
    </span>
  </div>
</div>


<p class="clone-options">You can clone with
      <a href="#" class="js-clone-selector" data-protocol="http">HTTPS</a>,
      <a href="#" class="js-clone-selector" data-protocol="ssh">SSH</a>,
      or <a href="#" class="js-clone-selector" data-protocol="subversion">Subversion</a>.
  <a href="https://help.github.com/articles/which-remote-url-should-i-use" class="help tooltipped tooltipped-n" aria-label="Get help on which URL is right for you.">
    <span class="octicon octicon-question"></span>
  </a>
</p>


  <a href="github-windows://openRepo/https://github.com/jreesuk/jquery-entropizer" class="minibutton sidebar-button" title="Save jreesuk/jquery-entropizer to your computer and use it in GitHub Desktop." aria-label="Save jreesuk/jquery-entropizer to your computer and use it in GitHub Desktop.">
    <span class="octicon octicon-device-desktop"></span>
    Clone in Desktop
  </a>

                <a href="/jreesuk/jquery-entropizer/archive/master.zip"
                   class="minibutton sidebar-button"
                   aria-label="Download the contents of jreesuk/jquery-entropizer as a zip file"
                   title="Download the contents of jreesuk/jquery-entropizer as a zip file"
                   rel="nofollow">
                  <span class="octicon octicon-cloud-download"></span>
                  Download ZIP
                </a>
              </div>
        </div><!-- /.repository-sidebar -->

        <div id="js-repo-pjax-container" class="repository-content context-loader-container" data-pjax-container>
          

<a href="/jreesuk/jquery-entropizer/blob/0786347b28b2f75a71adb0ae88f43db96868b863/README.md" class="hidden js-permalink-shortcut" data-hotkey="y">Permalink</a>

<!-- blob contrib key: blob_contributors:v21:910325c18b255bfe2ce772a572a288b2 -->

<div class="file-navigation">
  
<div class="select-menu js-menu-container js-select-menu left">
  <span class="minibutton select-menu-button js-menu-target css-truncate" data-hotkey="w"
    data-master-branch="master"
    data-ref="master"
    title="master"
    role="button" aria-label="Switch branches or tags" tabindex="0" aria-haspopup="true">
    <span class="octicon octicon-git-branch"></span>
    <i>branch:</i>
    <span class="js-select-button css-truncate-target">master</span>
  </span>

  <div class="select-menu-modal-holder js-menu-content js-navigation-container" data-pjax aria-hidden="true">

    <div class="select-menu-modal">
      <div class="select-menu-header">
        <span class="select-menu-title">Switch branches/tags</span>
        <span class="octicon octicon-x js-menu-close" role="button" aria-label="Close"></span>
      </div> <!-- /.select-menu-header -->

      <div class="select-menu-filters">
        <div class="select-menu-text-filter">
          <input type="text" aria-label="Filter branches/tags" id="context-commitish-filter-field" class="js-filterable-field js-navigation-enable" placeholder="Filter branches/tags">
        </div>
        <div class="select-menu-tabs">
          <ul>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="branches" class="js-select-menu-tab">Branches</a>
            </li>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="tags" class="js-select-menu-tab">Tags</a>
            </li>
          </ul>
        </div><!-- /.select-menu-tabs -->
      </div><!-- /.select-menu-filters -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="branches">

        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/jreesuk/jquery-entropizer/blob/gh-pages/README.md"
                 data-name="gh-pages"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="gh-pages">gh-pages</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item selected">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/jreesuk/jquery-entropizer/blob/master/README.md"
                 data-name="master"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="master">master</a>
            </div> <!-- /.select-menu-item -->
        </div>

          <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="tags">
        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/jreesuk/jquery-entropizer/tree/0.1.0/README.md"
                 data-name="0.1.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="0.1.0">0.1.0</a>
            </div> <!-- /.select-menu-item -->
        </div>

        <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

    </div> <!-- /.select-menu-modal -->
  </div> <!-- /.select-menu-modal-holder -->
</div> <!-- /.select-menu -->

  <div class="button-group right">
    <a href="/jreesuk/jquery-entropizer/find/master"
          class="js-show-file-finder minibutton empty-icon tooltipped tooltipped-s"
          data-pjax
          data-hotkey="t"
          aria-label="Quickly jump between files">
      <span class="octicon octicon-list-unordered"></span>
    </a>
    <button class="js-zeroclipboard minibutton zeroclipboard-button"
          data-clipboard-text="README.md"
          aria-label="Copy to clipboard"
          data-copied-hint="Copied!">
      <span class="octicon octicon-clippy"></span>
    </button>
  </div>

  <div class="breadcrumb">
    <span class='repo-root js-repo-root'><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/jreesuk/jquery-entropizer" class="" data-branch="master" data-direction="back" data-pjax="true" itemscope="url"><span itemprop="title">jquery-entropizer</span></a></span></span><span class="separator"> / </span><strong class="final-path">README.md</strong>
  </div>
</div>


  <div class="commit commit-loader file-history-tease js-deferred-content" data-url="/jreesuk/jquery-entropizer/contributors/master/README.md">
    <div class="file-history-tease-header">
      Fetching contributors&hellip;
    </div>

    <div class="participation">
      <p class="loader-loading"><img alt="" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32-EAF2F5.gif" width="16" /></p>
      <p class="loader-error">Cannot retrieve contributors at this time</p>
    </div>
  </div>

<div class="file-box">
  <div class="file">
    <div class="meta clearfix">
      <div class="info file-name">
          <span>126 lines (93 sloc)</span>
          <span class="meta-divider"></span>
        <span>4.417 kb</span>
      </div>
      <div class="actions">
        <div class="button-group">
          <a href="/jreesuk/jquery-entropizer/raw/master/README.md" class="minibutton " id="raw-url">Raw</a>
            <a href="/jreesuk/jquery-entropizer/blame/master/README.md" class="minibutton js-update-url-with-hash">Blame</a>
          <a href="/jreesuk/jquery-entropizer/commits/master/README.md" class="minibutton " rel="nofollow">History</a>
        </div><!-- /.button-group -->

          <a class="octicon-button tooltipped tooltipped-nw"
             href="github-windows://openRepo/https://github.com/jreesuk/jquery-entropizer?branch=master&amp;filepath=README.md" aria-label="Open this file in GitHub for Windows">
              <span class="octicon octicon-device-desktop"></span>
          </a>

              <a class="octicon-button tooltipped tooltipped-n js-update-url-with-hash"
                 aria-label="Clicking this button will fork this project so you can edit the file"
                 href="/jreesuk/jquery-entropizer/edit/master/README.md"
                 data-method="post" rel="nofollow"><span class="octicon octicon-pencil"></span></a>

            <a class="octicon-button danger tooltipped tooltipped-s"
               href="/jreesuk/jquery-entropizer/delete/master/README.md"
               aria-label="Fork this project and delete file"
               data-method="post" data-test-id="delete-blob-file" rel="nofollow">
          <span class="octicon octicon-trashcan"></span>
        </a>
      </div><!-- /.actions -->
    </div>
      <div id="readme" class="blob instapaper_body">
    <article class="markdown-body entry-content" itemprop="mainContentOfPage"><h1>
<a name="user-content-jquery-entropizer" class="anchor" href="#jquery-entropizer" aria-hidden="true"><span class="octicon octicon-link"></span></a>jQuery Entropizer</h1>

<p><em>Password strength meter jQuery plugin</em></p>

<p>For the standalone Entropizer engine, click <a href="https://github.com/jreesuk/entropizer">here</a></p>

<h2>
<a name="user-content-what-is-jquery-entropizer" class="anchor" href="#what-is-jquery-entropizer" aria-hidden="true"><span class="octicon octicon-link"></span></a>What is jQuery Entropizer?</h2>

<p>jQuery Entropizer is a simple, lightweight jQuery plugin that uses the <a href="https://github.com/jreesuk/entropizer">Entropizer engine</a> to
calculate password entropy. It's easy to set up and provides several hooks to customize the UI.</p>

<p>jQuery Entropizer supports <a href="http://requirejs.org/">AMD</a> and <a href="http://wiki.commonjs.org/wiki/CommonJS">CommonJS</a>. It is available
as a <a href="http://bower.io/">bower</a> component.</p>

<h2>
<a name="user-content-demos" class="anchor" href="#demos" aria-hidden="true"><span class="octicon octicon-link"></span></a>Demos</h2>

<p>Some basic demos can be found <a href="http://jreesuk.github.io/jquery-entropizer/">here</a>.</p>

<h2>
<a name="user-content-getting-started" class="anchor" href="#getting-started" aria-hidden="true"><span class="octicon octicon-link"></span></a>Getting Started</h2>

<p>This plugin requires both <a href="http://jquery.com/">jQuery</a> (1.7.2+) and <a href="https://github.com/jreesuk/entropizer">Entropizer</a>.</p>

<p>Basic usage:</p>

<div class="highlight highlight-html"><pre><span class="nt">&lt;label</span> <span class="na">for=</span><span class="s">"pwd"</span><span class="nt">&gt;</span>Please enter a password<span class="nt">&lt;/label&gt;</span>
<span class="nt">&lt;input</span> <span class="na">type=</span><span class="s">"password"</span> <span class="na">id=</span><span class="s">"pwd"</span> <span class="na">name=</span><span class="s">"pwd"</span> <span class="nt">/&gt;</span>
<span class="nt">&lt;div</span> <span class="na">id=</span><span class="s">"meter"</span><span class="nt">&gt;&lt;/div&gt;</span>
</pre></div>

<div class="highlight highlight-js"><pre><span class="c1">// Creates a default Entropizer meter inside #meter and watches the first password field on the</span>
<span class="c1">// page by default</span>
<span class="nx">$</span><span class="p">(</span><span class="s1">'#meter'</span><span class="p">).</span><span class="nx">entropizer</span><span class="p">();</span>
</pre></div>

<p>Options and examples:</p>

<div class="highlight highlight-js"><pre><span class="c1">// Create an Entropizer meter using custom options</span>
<span class="nx">$</span><span class="p">(</span><span class="s1">'#meter'</span><span class="p">).</span><span class="nx">entropizer</span><span class="p">({</span>

    <span class="c1">// The input field to watch: any selector, DOM element or jQuery instance</span>
    <span class="c1">// Default: 'input[type=password]:first'</span>
    <span class="nx">target</span><span class="o">:</span> <span class="s1">'#pwd'</span><span class="p">,</span>

    <span class="c1">// The event(s) upon which to update the meter UI</span>
    <span class="c1">// Default: 'keydown keyup'</span>
    <span class="nx">on</span><span class="o">:</span> <span class="s1">'keydown'</span><span class="p">,</span>

    <span class="c1">// Used to calculate the percentage of the bar to fill (see map function below)</span>
    <span class="c1">// Default: 100</span>
    <span class="nx">maximum</span><span class="o">:</span> <span class="mi">80</span><span class="p">,</span>

    <span class="c1">// An array of ranges to use when classifying password strength. Used internally by default map</span>
    <span class="c1">// function and can be used publicly via $.entropizer.classify(value, buckets). Properties</span>
    <span class="c1">// 'min' and 'max' are used to calculate which bucket to use - upon finding a match, an object</span>
    <span class="c1">// containing all the other properties is returned, e.g. below, a value of 42 returns</span>
    <span class="c1">// { message: ':)' }</span>
    <span class="c1">// Default: 4 ranges with strength and color properties (see source for values)</span>
    <span class="nx">buckets</span><span class="o">:</span> <span class="p">[</span>
        <span class="p">{</span> <span class="nx">max</span><span class="o">:</span> <span class="mi">40</span><span class="p">,</span> <span class="nx">message</span><span class="o">:</span> <span class="s1">':('</span> <span class="p">},</span>
        <span class="p">{</span> <span class="nx">min</span><span class="o">:</span> <span class="mi">40</span><span class="p">,</span> <span class="nx">max</span><span class="o">:</span> <span class="mi">60</span><span class="p">,</span> <span class="nx">message</span><span class="o">:</span> <span class="s1">':)'</span> <span class="p">},</span>
        <span class="p">{</span> <span class="nx">min</span><span class="o">:</span> <span class="mi">60</span><span class="p">,</span> <span class="nx">message</span><span class="o">:</span> <span class="s1">':D'</span> <span class="p">}</span>
    <span class="p">],</span>

    <span class="c1">// Either an Entropizer engine options object or an Entropizer instance</span>
    <span class="c1">// Default: a new Entropizer instance with default settings</span>
    <span class="nx">engine</span><span class="o">:</span> <span class="p">{</span>
        <span class="nx">classes</span><span class="o">:</span> <span class="p">[</span><span class="s1">'lowercase'</span><span class="p">,</span> <span class="s1">'uppercase'</span><span class="p">,</span> <span class="s1">'numeric'</span><span class="p">]</span>
    <span class="p">},</span>

    <span class="c1">// A callback controlling UI creation - takes a jQuery instance representing the container</span>
    <span class="c1">// and returns an object containing UI components for access in update and destroy</span>
    <span class="c1">// Default: creates a track element (the bar background), a bar element and a text element</span>
    <span class="nx">create</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">container</span><span class="p">)</span> <span class="p">{</span>
        <span class="kd">var</span> <span class="nx">bar</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="s1">'&lt;div&gt;'</span><span class="p">).</span><span class="nx">appendTo</span><span class="p">(</span><span class="nx">container</span><span class="p">);</span>
        <span class="k">return</span> <span class="p">{</span> <span class="nx">foo</span><span class="o">:</span> <span class="nx">bar</span> <span class="p">};</span>
    <span class="p">},</span>

    <span class="c1">// A callback controlling UI cleanup - takes the UI object created by create</span>
    <span class="c1">// Default: removes the track, bar and text elements</span>
    <span class="nx">destroy</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">ui</span><span class="p">)</span> <span class="p">{</span>
        <span class="nx">ui</span><span class="p">.</span><span class="nx">foo</span><span class="p">.</span><span class="nx">remove</span><span class="p">();</span>
    <span class="p">},</span>

    <span class="c1">// A callback that maps the raw entropy value to an object passed to update. First argument is</span>
    <span class="c1">// the number of bits of entropy, second argument is an object containing all properties on</span>
    <span class="c1">// the options object apart from target, on, engine and the callbacks (i.e. by default, just</span>
    <span class="c1">// maximum and buckets)</span>
    <span class="c1">// Default: uses maximum and buckets above to return an object with entropy, percent, strength</span>
    <span class="c1">// and color properties</span>
    <span class="nx">map</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">entropy</span><span class="p">,</span> <span class="nx">mapOptions</span><span class="p">)</span> <span class="p">{</span>
        <span class="k">return</span> <span class="nx">$</span><span class="p">.</span><span class="nx">extend</span><span class="p">({</span> <span class="nx">entropy</span><span class="o">:</span> <span class="nx">entropy</span> <span class="p">},</span> <span class="nx">$</span><span class="p">.</span><span class="nx">entropizer</span><span class="p">.</span><span class="nx">classify</span><span class="p">(</span><span class="nx">entropy</span><span class="p">,</span> <span class="nx">mapOptions</span><span class="p">.</span><span class="nx">buckets</span><span class="p">));</span>
    <span class="p">},</span>

    <span class="c1">// A callback controlling UI updates - takes the data returned by map and the ui object</span>
    <span class="c1">// Default: updates the width and background color of the bar, and displays the number of bits</span>
    <span class="nx">update</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">data</span><span class="p">,</span> <span class="nx">ui</span><span class="p">)</span> <span class="p">{</span>
        <span class="nx">ui</span><span class="p">.</span><span class="nx">foo</span><span class="p">.</span><span class="nx">text</span><span class="p">(</span><span class="nx">data</span><span class="p">.</span><span class="nx">entropy</span><span class="p">.</span><span class="nx">toFixed</span><span class="p">(</span><span class="mi">0</span><span class="p">)</span> <span class="o">+</span> <span class="s1">' '</span> <span class="o">+</span> <span class="nx">data</span><span class="p">.</span><span class="nx">message</span><span class="p">);</span>
    <span class="p">}</span>
<span class="p">});</span>
</pre></div>

<p>If you need to remove an <code>entropizer</code> instance:</p>

<div class="highlight highlight-js"><pre><span class="nx">$</span><span class="p">(</span><span class="s1">'#meter'</span><span class="p">).</span><span class="nx">entropizer</span><span class="p">(</span><span class="s1">'destroy'</span><span class="p">);</span>
</pre></div>

<p>This will unbind all Entropizer events from the target and invoke the <code>destroy</code> callback.</p>

<h2>
<a name="user-content-styling" class="anchor" href="#styling" aria-hidden="true"><span class="octicon octicon-link"></span></a>Styling</h2>

<p>The default UI creates elements for the track, bar and text - these use the CSS classes
<code>entropizer-track</code>, <code>entropizer-bar</code> and <code>entropizer-text</code> respectively. Default styles for these
elements can be found in the provided CSS stylesheet.</p>

<h2>
<a name="user-content-engine-options" class="anchor" href="#engine-options" aria-hidden="true"><span class="octicon octicon-link"></span></a>Engine options</h2>

<p>For a guide to Entropizer engine options, see the readme <a href="https://github.com/jreesuk/entropizer">here</a>.</p>

<h2>
<a name="user-content-browser-compatibility" class="anchor" href="#browser-compatibility" aria-hidden="true"><span class="octicon octicon-link"></span></a>Browser compatibility</h2>

<p>jQuery Entropizer supports IE6+, Firefox, Chrome and Opera.</p>
</article>
  </div>

  </div>
</div>

<a href="#jump-to-line" rel="facebox[.linejump]" data-hotkey="l" style="display:none">Jump to Line</a>
<div id="jump-to-line" style="display:none">
  <form accept-charset="UTF-8" class="js-jump-to-line-form">
    <input class="linejump-input js-jump-to-line-field" type="text" placeholder="Jump to line&hellip;" autofocus>
    <button type="submit" class="button">Go</button>
  </form>
</div>

        </div>

      </div><!-- /.repo-container -->
      <div class="modal-backdrop"></div>
    </div><!-- /.container -->
  </div><!-- /.site -->


    </div><!-- /.wrapper -->

      <div class="container">
  <div class="site-footer" role="contentinfo">
    <ul class="site-footer-links right">
      <li><a href="https://status.github.com/">Status</a></li>
      <li><a href="http://developer.github.com">API</a></li>
      <li><a href="http://training.github.com">Training</a></li>
      <li><a href="http://shop.github.com">Shop</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/about">About</a></li>

    </ul>

    <a href="/" aria-label="Homepage">
      <span class="mega-octicon octicon-mark-github" title="GitHub"></span>
    </a>

    <ul class="site-footer-links">
      <li>&copy; 2014 <span title="0.09857s from github-fe122-cp1-prd.iad.github.net">GitHub</span>, Inc.</li>
        <li><a href="/site/terms">Terms</a></li>
        <li><a href="/site/privacy">Privacy</a></li>
        <li><a href="/security">Security</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
  </div><!-- /.site-footer -->
</div><!-- /.container -->


    <div class="fullscreen-overlay js-fullscreen-overlay" id="fullscreen_overlay">
  <div class="fullscreen-container js-suggester-container">
    <div class="textarea-wrap">
      <textarea name="fullscreen-contents" id="fullscreen-contents" class="fullscreen-contents js-fullscreen-contents js-suggester-field" placeholder=""></textarea>
    </div>
  </div>
  <div class="fullscreen-sidebar">
    <a href="#" class="exit-fullscreen js-exit-fullscreen tooltipped tooltipped-w" aria-label="Exit Zen Mode">
      <span class="mega-octicon octicon-screen-normal"></span>
    </a>
    <a href="#" class="theme-switcher js-theme-switcher tooltipped tooltipped-w"
      aria-label="Switch themes">
      <span class="octicon octicon-color-mode"></span>
    </a>
  </div>
</div>



    <div id="ajax-error-message" class="flash flash-error">
      <span class="octicon octicon-alert"></span>
      <a href="#" class="octicon octicon-x flash-close js-ajax-error-dismiss" aria-label="Dismiss error"></a>
      Something went wrong with that request. Please try again.
    </div>


      <script crossorigin="anonymous" src="https://assets-cdn.github.com/assets/frameworks-3d6415a807b351117a075649a484659a51123e9916f8d6db57c6d516d8ae60d7.js" type="text/javascript"></script>
      <script async="async" crossorigin="anonymous" src="https://assets-cdn.github.com/assets/github-3bc9b3e4883d2f34db938c1cb44d0237ec3a9e64b20a0e0d415a6e821a75b6a0.js" type="text/javascript"></script>
      
      
  </body>
</html>

