// == UserScript ==
// @name          fut_autobuy3r
// @namespace     http://tampermonkey.net/
// @versie       0.6
// @updateURL     https://github.com/Thijmen-Stegenga/autobuyer/blob/master/menu.js
// @description   Thanks for buying!
// @auteur        itsTechnix
// @match         https://www.easports.com/uk/fifa/ultimate-team/web-app/*
// @match         https://www.easports.com/fifa/ultimate-team/web-app/*
// @grant         geen
// == / UserScript ==

( functie ( )  {
    'strikt gebruiken' ;

    / **
      -links UTMarketSearchFiltersViewController
    * /

    raam . UTAutoBuyerViewController  =  function  ( )  {
        UTMarketSearchFiltersViewController . bel ( dit ) ;
        dit . _jsClassName  =  "UTAutoBuyerViewController" ;
    }

    raam . sellList  =  [ ] ;
    raam . autoBuyerActive  =  false ;

    raam . activAutoBuyer  =  function ( )  {
        if  ( window . autoBuyerActive )  {
            terugkeren ;
        }

        raam . autoBuyerActive  =  waar ;
        raam . informeren ( 'Autobyer gestart' ) ;
    }

    raam . deactivateAutoBuyer  =  function ( )  {
        if  ( ! window . autoBuyerActive )  {
            terugkeren ;
        }

        raam . autoBuyerActive  =  false ;
        raam . informeren ( 'Autobyer gestopt' ) ;
    }

    utils . JS . erft ( UTAutoBuyerViewController ,  UTMarketSearchFiltersViewController )
    raam . UTAutoBuyerViewController . prototype . init  =  functie  init ( )  {
        if  ( ! this . initialized )  {
            // getAppMain (). superklasse (),
            dit . _viewmodel  ||  ( dit . _viewmodel  =  nieuwe  viewmodellen . BucketedItemSearch ) ,
                dit . _viewmodel . zoekcriteria . type  ===  enums . Zoektype . ELKE  &&  ( dit . _Viewmodel . SearchCriteria . Type  =  enums . SearchType . PLAYER ) ;
            var  t  =  gConfigurationModel . getConfigObject ( modellen . ConfigurationModel . KEY_ITEMS_PER_PAGE )
            ,  Tel  =  1  +  ( utils . JS . IsValid ( t ) ? T [ modellen . ConfigurationModel . ITEMS_PER_PAGE . TRANSFER_MARKET ] : 15 ) ;
            dit . _viewmodel . zoekcriteria . tellen  =  tellen ,
                dit . _viewmodel . searchFeature  =  enums . ItemSearchFeature . MARKT ;
            var  view  =  dit . getView ( ) ;
            uitzicht . addTarget ( dit ,  dit . _eResetSelected ,  UTMarketSearchFiltersView . Event . RESET ) ,
                uitzicht . addTarget ( dit ,  venster . activateAutoBuyer ,  UTMarketSearchFiltersView . Event . SEARCH ) ,
                uitzicht . addTarget ( dit ,  dit . _eFilterChanged ,  UTMarketSearchFiltersView . Event . FILTER_CHANGE ) ,
                uitzicht . addTarget ( dit ,  dit . _eMinBidPriceChanged ,  UTMarketSearchFiltersView . Event . MIN_BID_PRICE_CHANGE ) ,
                uitzicht . addTarget ( dit ,  dit . _eMaxBidPriceChanged ,  UTMarketSearchFiltersView . Event . MAX_BID_PRICE_CHANGE ) ,
                uitzicht . addTarget ( dit ,  dit . _eMinBuyPriceChanged ,  UTMarketSearchFiltersView . Event . MIN_BUY_PRICE_CHANGE ) ,
                uitzicht . addTarget ( dit ,  dit . _eMaxBuyPriceChanged ,  UTMarketSearchFiltersView . Event . MAX_BUY_PRICE_CHANGE ) ,
                dit . _viewmodel . getCategoryTabVisible ( )  &&  ( view . initTabMenuComponent ( ) ,
                                                            uitzicht . getTabMenuComponent ( ) . addTarget ( dit ,  dit . _eSearchCategoryChanged ,  enums . Event . TAP ) ) ,
                dit . _squadContext ? isPhone ( )  ||  uitzicht . addClass ( "narrow" ) : bekijken . addClass ( "zwevend" ) ,
                uitzicht . getPlayerNameSearch ( ) . addTarget ( dit ,  dit . _ePlayerNameChanged ,  enums . Event . CHANGE ) ,
                uitzicht . __root . style  =  "width: 50%; float: left;" ;
        }
    } ;

    functie  addTabItem ( )  {
        if  ( jQuery ( 'h1.title' ) . html ( )  ==  'Home' )  {
            getAppMain ( ) . getRootViewController ( ) . showGameView  =  functie  showGameView ( )  {
                if  ( this . _presentedViewController  instantie van  UTGameTabBarController )
                    terugkeer ! 1 ;
                var  t ,  i  =  nieuwe  UTGameTabBarController ,
                    s  =  nieuwe  UTGameFlowNavigationController ,
                    o  =  nieuwe  UTGameFlowNavigationController ,
                    l  =  nieuwe  UTGameFlowNavigationController ,
                    u  =  nieuwe  UTGameFlowNavigationController ,
                    h  =  nieuwe  UTGameFlowNavigationController ,
                    p  =  nieuwe  UTTabBarItemView ,
                    _  =  nieuwe  UTTabBarItemView ,
                    g  =  nieuwe  UTTabBarItemView ,
                    m  =  nieuwe  UTTabBarItemView ,
                    S  =  nieuwe  UTTabBarItemView ;
                if  ( s . initWithRootController ( nieuwe  UTHomeHubViewController ) ,
                    o . initWithRootController ( nieuwe  UTSquadsHubViewController ) ,
                    l . initWithRootController ( nieuwe  UTTransfersHubViewController ) ,
                    u . initWithRootController ( nieuwe  UTStoreViewController ) ,
                    h . initWithRootController ( nieuwe  UTClubHubViewController ) ,
                    p . init ( ) ,
                    p . setTag ( UTGameTabBarController . TabTag . HOME ) ,
                    p . setText ( services . Lokalisatie . Lokaliseren ( "navbar.label.home" ) ) ,
                    p . addClass ( "icon-home" ) ,
                    _ . init ( ) ,
                    _ . setTag ( UTGameTabBarController . TabTag . SQUADS ) ,
                    _ . setText ( services . Lokalisatie . Lokaliseren ( "nav.label.squads" ) ) ,
                    _ . addClass ( "icon-squad" ) ,
                    g . init ( ) ,
                    g . setTag ( UTGameTabBarController . TabTag . TRANSFERS ) ,
                    g . setText ( services . Lokalisatie . lokaliseren ( "nav.label.trading" ) ) ,
                    g . addClass ( "icon-transfer" ) ,
                    m . init ( ) ,
                    m . setTag ( UTGameTabBarController . TabTag . STORE ) ,
                    m . setText ( services . Lokalisatie . Lokaliseren ( "navbar.label.store" ) ) ,
                    m . addClass ( "icon-store" ) ,
                    S . init ( ) ,
                    S . setTag ( UTGameTabBarController . TabTag . CLUB ) ,
                    S . setText ( services . Lokalisatie . lokaliseren ( "nav.label.club" ) ) ,
                    S . addClass ( "icon-club" ) ,
                    s . tabBarItem  =  p ,
                    o . tabBarItem  =  _ ,
                    l . tabBarItem  =  g ,
                    u . tabBarItem  =  m ,
                    h . tabBarItem  =  S ,
                    t  =  [ s ,  o ,  l ,  u ,  h ] ,
                    ! isPhone ( ) )  {
                    var  C  =  nieuwe  UTGameFlowNavigationController ,
                        T  =  nieuwe  UTGameFlowNavigationController ,
                        AB  =  nieuwe  UTGameFlowNavigationController ,  // toegevoegde rij
                        v  =  nieuwe  UTGameFlowNavigationController ;
                    C . initWithRootController ( nieuwe  UTSBCHubViewController ) ,
                        T . initWithRootController ( nieuwe  UTLeaderboardsHubViewController ) ,
                        AB . initWithRootController ( nieuwe  UTAutoBuyerViewController ) ,  // toegevoegde regel
                        v . initWithRootController ( nieuwe  UTAppSettingsViewController ) ;
                    var  L  =  nieuwe  UTTabBarItemView ;
                    L . init ( ) ,
                        L . setTag ( UTGameTabBarController . TabTag . SBC ) ,
                        L . setText ( services . Lokalisatie . Lokaliseren ( "nav.label.sbc" ) ) ,
                        L . addClass ( "icon-sbc" ) ;
                    var  I  =  nieuwe  UTTabBarItemView ;
                    Ik . init ( ) ,
                        Ik . setTag ( UTGameTabBarController . TabTag . LEADERBOARDS ) ,
                        Ik . setText ( services . Lokalisatie . Lokaliseren ( "nav.label.leaderboards" ) ) ,
                        Ik . addClass ( "icon-leaderboards" ) ;

                    // toegevoegde sectie
                    var  AutoBuyerTab  =  nieuwe  UTTabBarItemView ;
                    AutoBuyerTab . init ( ) ,
                        AutoBuyerTab . setTag ( 8 ) ,
                        AutoBuyerTab . setText ( 'AutoBuyer' ) ,
                        AutoBuyerTab . addClass ( "icon-transfer" ) ;

                    var  P  =  nieuwe  UTTabBarItemView ;
                    P . init ( ) ,
                        P . setTag ( UTGameTabBarController . TabTag . SETTINGS ) ,
                        P . setText ( services . Lokalisatie . Lokaliseren ( "button.settings" ) ) ,
                        P . addClass ( "icon-instellingen" ) ,
                        C . tabBarItem  =  L ,
                        T . tabBarItem  =  I ,
                        v . tabBarItem  =  P ,
                        AB . tabBarItem  =  AutoBuyerTab ,  // toegevoegde regel
                        t  =  t . concat ( [ C ,  T ,  v ,  AB ] )  // toegevoegde regel
                }
                terugkeer  i . initWithViewControllers ( t ) ,
                    ik . getView ( ) . addClass ( "game-navigatie" ) ,
                    dit . presentViewController ( i , ! 0 ,  functie ( )  {
                    diensten . URL . hasDeepLinkURL ( )  &&  services . URL . processDeepLinkURL ( )
                } ) ,
                    ! 0
            } ;

            getAppMain ( ) . getRootViewController ( ) . showGameView ( ) ;
        }  anders  {
            raam . setTimeout ( addTabItem  , 1000 ) ;
        }
    } ;

    functie  createAutoBuyerInterface ( )
    {
        if  ( jQuery ( 'h1.title' ) . html ( )  ==  'Home' )  {
            raam . hasLoadedAll  =  true ;
        }

        if  ( window . hasLoadedAll  &&  getAppMain ( ) . getRootViewController ( ) . getPresentedViewController ( ) . getCurrentViewController ( ) . getCurrentController ( ) . _jsClassName )  {
            if  ( ! jQuery ( '.SearchWrapper' ) . length )  {
                var  view  =  getAppMain ( ) . getRootViewController ( ) . getPresentedViewController ( ) . getCurrentViewController ( ) . getCurrentController ( ) . _view ;
                jQuery ( bekijk . __root . parentElement ) . voorafgaan (
                    '<div id = "InfoWrapper" class = "ut-navigation-bar-view navbar-style-landscape">'  +
                    '<h1 class = "title"> AUTOBUYER STATUS: <span id = "ab_status"> </span> | AANTAL VERZOEK: <span id = "ab_request_count"> 0 </span> </h1> '  + 
                    '<div class = "view-navbar-clubinfo">'  +
                    '<div class = "view-navbar-clubinfo-data">'  +
                    '<div class = "view-navbar-clubinfo-name">'  +
                    '<div style = "float: left;"> Zoeken: </div>'  +
                    '<div style = "float: right; height: 10px; width: 100px; background: # 888; margin: 5px 0px 5px 5px;">'  +
                    '<div id = "ab_search_progress" style = "background: # 000; height: 10px; width: 0%"> </div>'  +
                    '</div>'  +
                    '</div>'  +
                    '<div class = "view-navbar-clubinfo-name">'  +
                    '<div style = "float: left;"> Statistieken: </div>'  +
                    '<div style = "float: right; height: 10px; width: 100px; background: # 888; margin: 5px 0px 5px 5px;">'  +
                    '<div id = "ab_statistics_progress" style = "background: # 000; height: 10px; width: 0%"> </div>'  +
                    '</div>'  +
                    '</div>'  +
                    '</div>'  +
                    '</div>'  +
                    '<div class = "view-navbar-currency" style = "margin-left: 10px;">'  + 
                    '<div class = "view-navbar-currency-coins" id = "ab_coins"> </div>'  + 
                    '</div>'  +
                    '<div class = "view-navbar-clubinfo">'  + 
                    '<div class = "view-navbar-clubinfo-data">'  +
                    '<span class = "view-navbar-clubinfo-name"> Verkochte items: <span id = "ab-sold-items"> </span> </span>'  +
                    '<span class = "view-navbar-clubinfo-name"> Onverkochte items: <span id = "ab-unsold-items"> </span> </span>'  +
                    '</div>'  +
                    '</div>'  +
                    '<div class = "view-navbar-clubinfo" style = "border: none;">'  + 
                    '<div class = "view-navbar-clubinfo-data">'  +
                    '<span class = "view-navbar-clubinfo-name"> Beschikbare items: <span id = "ab-available-items"> </span> </span>'  +
                    '<span class = "view-navbar-clubinfo-name"> Actieve transfers: <span id = "ab-active-transfers"> </span> </span>'  +
                    '</div>'  +
                    '</div>'  +
                    '</div>'
                ) ;

                jQuery ( bekijk . __root . parentElement ) . append ( '<div id = "SearchWrapper" style = "width: 50%; right: 50%"> <textarea readonly id = "progressAutobuyer" style = "font-size: 15px; width: 100%; height: 58% ; "> </textarea> <label> Zoekresultaten: </label> <br/> <textarea readonly id =" autoBuyerFoundLog "style =" font-size: 10px; width: 100%; height: 26%; "> </textarea> </div> ' ) ;

                writeToLog ( 'Autobuyer Ready' ) ;
            }

            if  ( jQuery ( '.search-prices' ) . first ( ) . length )  {
                if  ( ! jQuery ( '#ab_buy_price' ) . length )  {
                    jQuery ( '.search-prijzen' ) . eerst ( ) . toevoegen (
                        '<div class = "search-price-header">'  + 
                        '<h1 class = "secundair"> AB-instellingen: </h1>' +
                        '</div>'  +
                        '<div class = "price-filter">'  + 
                        '<div class = "info">'  + 
                        '<span class = "secundair label"> Verkoopprijs: </span> <br/> <small> Ontvangen na belasting: <span id = "sell_after_tax"> 0 </span> </small>'  + 
                        '</div>'  + 
                        '<div class = "buttonInfo">'  +
                        '<div class = "inputBox">'  + 
                        '<input type = "tel" class = "numericInput" id = "ab_sell_price" placeholder = "7000">'  + 
                        '</div>'  + 
                        '</div>'  +
                        '</div>'  +
                        '<div class = "price-filter">'  +
                        '<div class = "info">'  + 
                        '<span class = "secundair label"> Koopprijs: </span>'  + 
                        '</div>'  + 
                        '<div class = "buttonInfo">'  + 
                        '<div class = "inputBox">'  + 
                        '<input type = "tel" class = "numericInput" id = "ab_buy_price" placeholder = "5000">'  + 
                        '</div>'  + 
                        '</div>'  +
                        '</div>'  +
                        '<div class = "price-filter">'  +
                        '<div class = "info">'  +
                        '<span class = "secundair label"> Wachttijd: <br/> <small> (willekeurig tweede bereik bijv. 7-15) </small>: </span>'  +
                        '</div>'  +
                        '<div class = "buttonInfo">'  +
                        '<div class = "inputBox">'  +
                        '<input type = "tel" class = "numericInput" id = "ab_wait_time" placeholder = "7-15">'  +
                        '</div>'  +
                        '</div>'  +
                        '</div>'  +
                        '<div class = "price-filter">'  +
                        '<div class = "info">'  +
                        '<span class = "secundair label"> Min clear count: <br/> <small> (verwijder verkochte items als het aantal niet kleiner is dan) </small>: </span>'  +
                        '</div>'  +
                        '<div class = "buttonInfo">'  +
                        '<div class = "inputBox">'  +
                        '<input type = "tel" class = "numericInput" id = "ab_min_delete_count" placeholder = "10">'  +
                        '</div>'  +
                        '</div>'  +
                        '</div>'  +
                        '<div class = "price-filter">'  +
                        '<div class = "info">'  +
                        '<span class = "secundair label"> Max. aankopen per zoekverzoek: </span>'  +
                        '</div>'  +
                        '<div class = "buttonInfo">'  +
                        '<div class = "inputBox">'  +
                        '<input type = "text" class = "numericInput" id = "ab_max_purchases" placeholder = "3">'  +
                        '</div>'  +
                        '</div>'  +
                        '</div>'
                    ) ;
                }
            }

            if  ( ! jQuery ( '#search_cancel_button' ) . length )  {
                jQuery ( '#InfoWrapper' ) . volgende ( ) . zoek ( '.button-container button' ) . eerst ( ) . after ( '<button class = "btn-standard" id = "search_cancel_button"> Stop </button>' )
            }
        }  anders  {
            raam . setTimeout ( createAutoBuyerInterface ,  1000 ) ;
        }
    }

    jQuery ( document ) . aan ( 'klik' ,  '#search_cancel_button' ,  deactiveer AutoBuyer ) ;

    jQuery ( document ) . op ( 'keyup' ,  '#ab_sell_price' ,  function ( ) {
        jQuery ( '#sell_after_tax' ) . html ( ( jQuery ( '#ab_sell_price' ) . val ( )  -  ( ( parseInt ( jQuery ( '#ab_sell_price' ) . val ( ) ) / 100 ) * 5 ) ) . toLocaleString ( ) ) ;
    } ) ;

    raam . updateAutoTransferListStat  =  function ( )  {
        if  ( ! window . autoBuyerActive )  {
            terugkeren ;
        }

        raam . updateTransferList ( ) ;
    } ;

    raam . writeToLog  =  function ( bericht )  {
        var  $ log  =  jQuery ( '#progressAutobuyer' ) ;
        message  =  "["  +  nieuwe  datum ( ) . toLocaleTimeString ( )  +  "]"  +  bericht  +  "\ n" ;
        $ logboek . val ( $ log . val ( )  +  bericht ) ;
        $ logboek . scrollTop ( $ log [ 0 ] . scrollHeight ) ;
    } ;

    raam . writeToDebugLog  =  function ( bericht )  {
        var  $ log  =  jQuery ( '#autoBuyerFoundLog' ) ;
        message  =  "["  +  nieuwe  datum ( ) . toLocaleTimeString ( )  +  "]"  +  bericht  +  "\ n" ;
        $ logboek . val ( $ log . val ( )  +  bericht ) ;
        $ logboek . scrollTop ( $ log [ 0 ] . scrollHeight ) ;
    } ;

    raam . informeren  =  functie ( bericht )  {
        diensten . Kennisgeving . wachtrij ( [ bericht ,  enums . UINotificationType . POSITIVE ] )
    } ;

    raam . getRandomWait  =  function ( )  {
        var  addedTime  =  0 ;
        if  ( window . searchCount % 15  ===  0 )  {
            addedTime  =  10000 ;
        }

        var  wait  =  [ 7 ,  15 ] ;
        if  ( jQuery ( '#ab_wait_time' ) . val ( ) ! == '' )  {
            wait  =  jQuery ( '#ab_wait_time' ) . val ( ) . splitsen ( '-' ) ;
        }
        raam . searchCount ++ ;
        return  ( Math . round ( ( Math . willekeurige ( ) * ( wachten [ 1 ]  -  wachten [ 0 ] )  +  wachten [ 0 ] ) ) * 1000 )  +  5000  +  addedTime ;
    } ;

    raam . getTimerProgress  =  functie  ( timer )  {
        var  time  =  ( nieuwe  datum ( ) ) . getTime ( ) ;

        return  ( Math . max ( 0 ,  timer . afwerking  -  tijd ) / ( timer . afwerking  -  timer . start ) ) * 100 ;
    } ;

    raam . updateStatistics  =  function  ( )  {
        jQuery ( '#ab_search_progress' ) . css ( 'width' ,  window . getTimerProgress ( window . timers . search ) ) ;
        jQuery ( '#ab_statistics_progress' ) . css ( 'width' ,  window . getTimerProgress ( window . timers . transferList ) ) ;

        jQuery ( '#ab_request_count' ) . html ( window . searchCount ) ;

        jQuery ( '#ab_coins' ) . html ( venster . futStatistics . munten ) ;

        if  ( window . autoBuyerActive )  {
            jQuery ( '#ab_status' ) . css ( 'color' ,  '# 2cbe2d' ) . html ( 'RUNNING' ) ;
        }  anders  {
            jQuery ( '#ab_status' ) . css ( 'kleur' ,  'rood' ) . html ( 'IDLE' ) ;
        }

        jQuery ( '# ab-sold-items' ) . html ( window . futStatistics . soldItems ) ;
        jQuery ( '# ab-onverkochte items' ) . html ( window . futStatistics . unsoldItems ) ;
        jQuery ( '# ab-beschikbare-items' ) . html ( window . futStatistics . availableItems ) ;
        jQuery ( '# ab-active-transfers' ) . html ( window . futStatistics . activeTransfers ) ;

        if  ( window . futStatistics . unsoldItems )  {
            jQuery ( '# ab-onverkochte items' ) . css ( 'kleur' ,  'rood' ) ;
        }  anders  {
            jQuery ( '# ab-onverkochte items' ) . css ( 'kleur' ,  '' ) ;
        }

        if  ( window . futStatistics . availableItems )  {
            jQuery ( '# ab-beschikbare-items' ) . css ( 'kleur' ,  'oranje' ) ;
        }  anders  {
            jQuery ( '# ab-beschikbare-items' ) . css ( 'kleur' ,  '' ) ;
        }
    } ;

    raam . hasLoadedAll  =  false ;
    raam . searchCount  =  0 ;
    createAutoBuyerInterface ( ) ;
    addTabItem ( ) ;
} ) ( ) ;