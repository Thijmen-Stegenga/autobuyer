// == UserScript ==
// @name          fut_autobuy3r
// @namespace     http://tampermonkey.net/
// @versie        0.6
// @updateURL     https://github.com/oRastor/fut20-web-app/raw/master/autobuyer.user.js
// @description   probeer de wereld over te nemen!
// @auteur        Rastor
// @match         https://www.easports.com/uk/fifa/ultimate-team/web-app/*
// @match         https://www.easports.com/fifa/ultimate-team/web-app/*
// @grant         geen
// == / UserScript ==

( functie ( )  {
    'strikt gebruiken' ;
    raam . getMaxSearchBid  =  function ( min ,  max )  {
        geef  Math terug . rond ( ( Math . random ( ) * ( max  -  min )  +  min ) / 1000 ) * 1000 ;
    } ;

    raam . searchCount  =  0 ;

    raam . initStatisics  =  function ( )  {
        raam . futStatistics  =  {
            soldItems : '-' ,
            unsoldItems : '-' ,
            activeTransfers : '-' ,
            availableItems : '-' ,
            munten : '-' ,
        } ;

        raam . timers  =  {
            zoeken : venster . createTimeout ( 0 ,  0 ) ,
            munten : venster . createTimeout ( 0 ,  0 ) ,
            transferList : venster . createTimeout ( 0 ,  0 ) ,
        } ;
    } ;
    
    raam . biedingen  =  [ ] ;

    raam . createTimeout  =  function ( tijd ,  interval )  {
        terug  {
            begin : tijd ,
            finish : tijd  +  interval ,
        } ;
    } ;

    raam . processor  =  venster . setInterval ( function ( )  {
        if  ( window . autoBuyerActive )  {
            var  time  =  ( nieuwe  datum ( ) ) . getTime ( ) ;

            if  ( window . timers . search . finish  ==  0  ||  window . timers . search . finish <= tijd )  {
                raam . searchFutMarket ( null , null , null ) ;

                raam . timers . zoeken  =  venster . createTimeout ( tijd ,  venster . getRandomWait ( ) ) ;
            }

            if  ( window . timers . coins . finish  ==  0  ||  window . timers . coins . finish <= tijd )  {
                raam . futStatistics . munten  =  diensten . Gebruiker . getUser ( ) . munten . bedrag . toLocaleString ( ) ;

                raam . timers . munten  =  venster . createTimeout ( tijd ,  2500 ) ;
            }

            if  ( window . timers . transferList . finish  ==  0  ||  window . timers . transferList . finish <= tijd )  {
                raam . updateTransferList ( ) ;

                raam . timers . transferList  =  venster . createTimeout ( tijd ,  30000 ) ;
            }
        }  anders  {
            raam . initStatisics ( ) ;
        }

        raam . updateStatistics ( ) ;
    } ,  500 ) ;

    raam . searchFutMarket  =  function ( afzender ,  gebeurtenis ,  gegevens )  {
        if  ( ! window . autoBuyerActive )  {
            terugkeren ;
        }

        var  searchCriteria  =  getAppMain ( ) . getRootViewController ( ) . getPresentedViewController ( ) . getCurrentViewController ( ) . getCurrentController ( ) . _viewmodel . zoekcriteria ;

        zoekcriteria . maxBid  =  venster . getMaxSearchBid ( 300000 ,  800000 ) ;

        diensten . Item . clearTransferMarketCache ( ) ;

        diensten . Item . searchTransferMarket ( zoekcriteria ,  1 ) . observeren ( this ,  ( function ( sender ,  response )  {
            if  ( respons . succes )  {
                writeToDebugLog ( 'Ontvangen'  +  antwoord . gegevens . items . lengte  +  'items' ) ;

                var  maxPurchases  =  3 ;
                if  ( $ ( '#ab_max_purchases' ) . val ( ) ! == '' )  {
                    maxPurchases  =  Math . max ( 1 ,  parseInt ( $ ( '#ab_max_purchases' ) . val ( ) ) ) ;
                }

                reactie . gegevens . artikelen . sort ( functie ( a ,  b )  {
                    var  priceDiff  =  een . _veiling . buyNowPrice  -  b . _veiling . buyNowPrice ;

                    if  ( priceDiff ! = 0 )  {
                        terugkeer  priceDiff ;
                    }

                    retourneer  een . _veiling . verloopt  -  b . _veiling . verloopt ;
                } ) ;

                voor  ( var  i  =  0 ;  i  <  respons . gegevens . items . lengte ;  i ++ )  {
                    var  player  =  reactie . gegevens . items [ i ] ;
                    var  veiling  =  speler . _veiling ;

                    var  buyNowPrice  =  veiling . buyNowPrice ;
                    var  tradeId  =  veiling . tradeId ;
                    var  tradeState  =  veiling . tradeState ;

                    var  verloopt  =  services . Lokalisatie . localizeAuctionTimeRemaining ( veiling . verloopt ) ;
                    writeToDebugLog ( player . _staticData . firstName  +  ''  +  player . _staticData . lastName  +  '['  +  veiling . tradeId  +  '] ['  +  verloopt  +  ']'  +  buyNowPrice ) ;
                    
                    if  ( buyNowPrice <= parseInt ( jQuery ( '#ab_buy_price' ) . val ( ) )  && ! window . biedingen . omvat ( veiling . tradeId )  &&  - maxPurchases > = 0 )  {
                        buyPlayer ( speler ,  buyNowPrice ) ;
                        
                        als  ( ! window . biedingen . omvat ( veiling . tradeId ) )  {
                            raam . biedingen . push ( veiling . tradeId ) ;
                            
                            als  ( venster . biedingen . lengte  >  300 )  {
                                raam . biedingen . shift ( ) ;
                            }
                        }
                    }
                } ;
            }
        } ) ) ;
    }

    raam . buyPlayer  =  functie ( speler ,  prijs )  {
        diensten . Item . bod ( speler ,  prijs ) . observeren ( this ,  ( function ( sender ,  data ) {
            if  ( data . success )  {
                writeToLog ( player . _staticData . firstName  +  ''  +  player . _staticData . lastName  +  '['  +  player . _auction . tradeId  +  ']'  +  prijs  +  'gekocht' ) ;
                var  sellPrice  =  parseInt ( jQuery ( '#ab_sell_price' ) . val ( ) ) ;
                if  ( sellPrice ! == 0 )  {
                    writeToLog ( '- Verkopen voor:'  +  sellPrice ) ;
                    raam . sellRequestTimeout  =  venster . setTimeout ( function ( )  {
                        diensten . Item . lijst ( speler ,  venster . getSellBidPrice ( sellPrice ) ,  sellPrice ,  3600 ) ;
                    } ,  venster . getRandomWait ( ) ) ;
                }
            }  anders  {
                writeToLog ( player . _staticData . firstName  +  ''  +  player . _staticData . lastName  +  '['  +  player . _auction . tradeId  +  ']'  +  prijs  +  'buy mislukt' ) ;
            }
        } ) ) ;
    }

    raam . getSellBidPrice  =  function ( bin )  {
        if  ( bin <= 1000 )  {
            terugkeer  bin  -  50 ;
        }

        if  ( bin  >  1000  &&  bin <= 10000 )  {
            terug  bin  -  100 ;
        }

        if  ( bin  >  10000  &&  bin <= 50000 )  {
            terug  bin  -  250 ;
        }

        if  ( bin  >  50000  &&  bin <= 100000 )  {
            terug  bin  -  500 ;
        }

        terug  bin  -  1000 ;
    } ;

    raam . updateTransferList  =  function ( )  {
        diensten . Item . requestTransferItems ( ) . observeren ( this ,  function ( t ,  response )  {
            raam . futStatistics . soldItems  =  reactie . gegevens . artikelen . filter ( functie ( item )  {
                 item retourneren . getAuctionData ( ) . isSold ( ) ;
            } ) . lengte ;

            raam . futStatistics . unsoldItems  =  antwoord . gegevens . artikelen . filter ( functie ( item )  {
                terugkeer ! item . getAuctionData ( ) . isSold ( )  &&  item . getAuctionData ( ) . isExpired ( ) ;
            } ) . lengte ;

            raam . futStatistics . activeTransfers  =  antwoord . gegevens . artikelen . filter ( functie ( item )  {
                 item retourneren . getAuctionData ( ) . isSelling ( ) ;
            } ) . lengte ;

            raam . futStatistics . availableItems  =  reactie . gegevens . artikelen . filter ( functie ( item )  {
                 item retourneren . getAuctionData ( ) . isInactief ( ) ;
            } ) . lengte ;

            var  minSoldCount  =  10 ;
            if  ( $ ( '#ab_min_delete_count' ) . val ( ) ! == '' )  {
                minSoldCount  =  Wiskunde . max ( 1 ,  parseInt ( $ ( '#ab_min_delete_count' ) . val ( ) ) ) ;
            }

            if  ( window . futStatistics . soldItems > = minSoldCount )  {
                writeToLog ( window . futStatistics . soldItems  +  "item (s) sold" ) " ;
                raam . clearSoldItems ( ) ;
            }
        } ) ;
    }

    raam . clearSoldItems  =  function ( )  {
        diensten . Item . clearSoldItems ( ) . observeren ( this ,  function ( t ,  response )  { } ) ;
    }

    functie  getLeagueIdByAbbr ( abbr )  {
        var  leagues  =  Object . waarden ( repositories . TeamConfig . _leagues . _collection [ '11' ] . _leagues . _collection ) ;
        var  leagueId  =  0 ;
        voor ( var  i  =  0 ;  i  <  competities . lengte ;  i ++ )  {
            if  ( abbr  ===  competities [ i ] . afkorting )  {
                leagueId  =  competities [ i ] . id ;
                breken ;
            }
        }

        terugkeer  leagueId ;
    }
} ) ( ) ;