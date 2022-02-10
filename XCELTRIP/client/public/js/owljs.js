jQuery(document).ready(function($) {
    var s = [{
            $Duration: 0,
            x: .25,
            $Zoom: 1.5,
            $Easing: {
                $Left: $JssorEasing$.$EaseInWave,
                $Zoom: $JssorEasing$.$EaseInSine
            },
            $Opacity: 2,
            $ZIndex: -10,
            $Brother: {
                $Duration: 0,
                x: -.25,
                $Zoom: 1.5,
                $Easing: {
                    $Left: $JssorEasing$.$EaseInWave,
                    $Zoom: $JssorEasing$.$EaseInSine
                },
                $Opacity: 2,
                $ZIndex: -10
            }
        }, {
            $Duration: 0,
            x: 1,
            y: .2,
            $Delay:  10,
            $Cols: 10,
            $Rows: 5,
            $Clip: 15
        }, {
            $Duration: 1e3,
            y: -1,
            $Delay:  10,
            $Cols: 15,
            $SlideOut: !0,
            $Formation: $JssorSlideshowFormations$.$FormationStraight,
            $Easing: $JssorEasing$.$EaseOutJump,
            $Round: {
                $Top: 1.5
            }
        }, {
            $Duration: 0,
            x: -1,
            y: .5,
            $Delay:  10,
            $Cols: 8,
            $Rows: 4,
            $SlideOut: !0,
            $Formation: $JssorSlideshowFormations$.$FormationSwirl,
            $Easing: {
                $Left: $JssorEasing$.$EaseLinear,
                $Top: $JssorEasing$.$EaseOutWave
            },
            $Assembly: 260,
            $Round: {
                $Top: 1.5
            }
        }, {
            $Duration: 0,
            x: -1,
            y: .5,
            $Delay:  10,
            $Cols: 8,
            $Rows: 4,
            $SlideOut: !0,
            $Formation: $JssorSlideshowFormations$.$FormationSwirl,
            $Easing: {
                $Left: $JssorEasing$.$EaseLinear,
                $Top: $JssorEasing$.$EaseOutJump
            },
            $Assembly: 260,
            $Round: {
                $Top: 1.5
            }
        }, {
            $Duration: 0,
            x: -1,
            y: .5,
            $Delay:  10,
            $Cols: 8,
            $Rows: 4,
            $SlideOut: !0,
            $Formation: $JssorSlideshowFormations$.$FormationZigZag,
            $Easing: {
                $Left: $JssorEasing$.$EaseLinear,
                $Top: $JssorEasing$.$EaseOutJump
            },
            $Assembly: 260,
            $Round: {
                $Top: 1.5
            }
        }, {
            $Duration: 0,
            x: -1,
            y: -.5,
            $Delay:  10,
            $Cols: 8,
            $Rows: 4,
            $Reverse: !0,
            $Formation: $JssorSlideshowFormations$.$FormationRectangle,
            $Easing: {
                $Left: $JssorEasing$.$EaseSwing,
                $Top: $JssorEasing$.$EaseInJump
            },
            $Assembly: 260,
            $Round: {
                $Top: 1.5
            }
        }, {
            $Duration:0,
            x: -1,
            y: .5,
            $Delay: 10,
            $Cols: 8,
            $Rows: 4,
            $SlideOut: !0,
            $Formation: $JssorSlideshowFormations$.$FormationSquare,
            $Easing: {
                $Left: $JssorEasing$.$EaseLinear,
                $Top: $JssorEasing$.$EaseOutJump
            },
            $Assembly: 260,
            $Round: {
                $Top: 1.5
            }
        }],
        
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		a = [];
    a.CPU = {
        $Duration: 1400,
        x: .25,
        $Zoom: 1.5,
        $Easing: {
            $Left: $JssorEasing$.$EaseInWave,
            $Zoom: $JssorEasing$.$EaseInSine
        },
        $Opacity: 2,
        $ZIndex: -10,
        $Brother: {
            $Duration: 1400,
            x: -.25,
            $Zoom: 1.5,
            $Easing: {
                $Left: $JssorEasing$.$EaseInWave,
                $Zoom: $JssorEasing$.$EaseInSine
            },
            $Opacity: 2,
            $ZIndex: -10
        }
    }, a["FLTTR|R"] = {
        $Duration: 900,
        x: -.2,
        y: -.1,
        $Easing: {
            $Left: $JssorEasing$.$EaseLinear,
            $Top: $JssorEasing$.$EaseInWave
        },
        $Opacity: 2,
        $Round: {
            $Top: 1.3
        }
    }, a["MCLIP|L-FADE"] = {
        $Duration: 2200,
        $Clip: 1,
        $Move: !0,
        $Opacity: 1.7,
        $During: {
            $Clip: [.5, .5],
            $Opacity: [0, .5]
        }
    }, a["B*CLIP"] = {
        $Duration: 1200,
        y: -.6,
        $Clip: 3,
        $Easing: $JssorEasing$.$EaseInCubic,
        $Opacity: 2
    }, a["MCLIP|B-FADE"] = {
        $Duration: 1300,
        $Clip: 8,
        $Move: !0,
        $Opacity: 1.7,
        $During: {
            $Clip: [.5, .5],
            $Opacity: [0, .5]
        }
    }, a.L = {
        $Duration: 900,
        x: .6,
        $Easing: {
            $Left: $JssorEasing$.$EaseInOutSine
        },
        $Opacity: 2
    }, a.R = {
        $Duration: 900,
        x: -.6,
        $Easing: {
            $Left: $JssorEasing$.$EaseInOutSine
        },
        $Opacity: 2
    }, a.T = {
        $Duration: 900,
        y: .6,
        $Easing: {
            $Top: $JssorEasing$.$EaseInOutSine
        },
        $Opacity: 2
    }, a.B = {
        $Duration: 1100,
        $Zoom: 1,
        $During: {
            $Left: [.4, .6],
            $Top: [.4, .6],
            $Zoom: [.4, .6]
        },
        $Easing: {
            $Opacity: $JssorEasing$.$EaseLinear,
            $Rotate: $JssorEasing$.$EaseInQuad
        },
        $Opacity: 2,
        $Brother: {
            $Duration: 1e3,
            $Zoom: 1,
            $Rotate: -.5,
            $Easing: {
                $Opacity: $JssorEasing$.$EaseLinear,
                $Rotate: $JssorEasing$.$EaseInQuad
            },
            $Opacity: 2,
            $Shift: 200
        }
    }, a.TR = {
        $Duration: 900,
        x: -.6,
        y: .6,
        $Easing: {
            $Left: $JssorEasing$.$EaseInOutSine,
            $Top: $JssorEasing$.$EaseInOutSine
        },
        $Opacity: 2
    }, a["L|IB"] = {
        $Duration: 1200,
        x: .6,
        $Easing: {
            $Left: $JssorEasing$.$EaseInOutBack
        },
        $Opacity: 2
    }, a["R|IB"] = {
        $Duration: 1200,
        x: -.6,
        $Easing: {
            $Left: $JssorEasing$.$EaseInOutBack
        },
        $Opacity: 2
    }, a["T|IB"] = {
        $Duration: 1200,
        y: .6,
        $Easing: {
            $Top: $JssorEasing$.$EaseInOutBack
        },
        $Opacity: 2
    }, a["CLIP|LR"] = {
        $Duration: 900,
        $Clip: 3,
        $Easing: {
            $Clip: $JssorEasing$.$EaseInOutCubic
        },
        $Opacity: 2
    }, a["CLIP|TB"] = {
        $Duration: 900,
        $Clip: 12,
        $Easing: {
            $Clip: $JssorEasing$.$EaseInOutCubic
        },
        $Opacity: 2
    }, a["CLIP|L"] = {
        $Duration: 900,
        $Clip: 1,
        $Easing: {
            $Clip: $JssorEasing$.$EaseInOutCubic
        },
        $Opacity: 2
    }, a["MCLIP|R"] = {
        $Duration: 900,
        $Clip: 2,
        $Move: !0,
        $Easing: {
            $Clip: $JssorEasing$.$EaseInOutCubic
        },
        $Opacity: 2
    }, a["MCLIP|T"] = {
        $Duration: 900,
        $Clip: 4,
        $Move: !0,
        $Easing: {
            $Clip: $JssorEasing$.$EaseInOutCubic
        },
        $Opacity: 2
    }, a["WV|B"] = {
        $Duration: 1200,
        x: -.2,
        y: -.6,
        $Easing: {
            $Left: $JssorEasing$.$EaseInWave,
            $Top: $JssorEasing$.$EaseLinear
        },
        $Opacity: 2,
        $Round: {
            $Left: 1.5
        }
    }, a["TORTUOUS|VB"] = {
        $Duration: 1800,
        y: -.2,
        $Zoom: 1,
        $Easing: {
            $Top: $JssorEasing$.$EaseOutWave,
            $Zoom: $JssorEasing$.$EaseOutCubic
        },
        $Opacity: 2,
        $During: {
            $Top: [0, .7]
        },
        $Round: {
            $Top: 1.3
        }
    }, a["LISTH|R"] = {
        $Duration: 1500,
        x: -.8,
        $Clip: 1,
        $Easing: $JssorEasing$.$EaseInOutCubic,
        $ScaleClip: .8,
        $Opacity: 2,
        $During: {
            $Left: [.4, .6],
            $Clip: [0, .4],
            $Opacity: [.4, .6]
        }
    }, a["RTT|360"] = {
        $Duration: 900,
        $Rotate: 1,
        $Easing: {
            $Opacity: $JssorEasing$.$EaseLinear,
            $Rotate: $JssorEasing$.$EaseInQuad
        },
        $Opacity: 2
    }, a["RTT|10"] = {
        $Duration: 900,
        $Zoom: 11,
        $Rotate: 1,
        $Easing: {
            $Zoom: $JssorEasing$.$EaseInExpo,
            $Opacity: $JssorEasing$.$EaseLinear,
            $Rotate: $JssorEasing$.$EaseInExpo
        },
        $Opacity: 2,
        $Round: {
            $Rotate: .8
        }
    }, a["RTTL|BR"] = {
        $Duration: 900,
        x: -.6,
        y: -.6,
        $Zoom: 11,
        $Rotate: 1,
        $Easing: {
            $Left: $JssorEasing$.$EaseInCubic,
            $Top: $JssorEasing$.$EaseInCubic,
            $Zoom: $JssorEasing$.$EaseInCubic,
            $Opacity: $JssorEasing$.$EaseLinear,
            $Rotate: $JssorEasing$.$EaseInCubic
        },
        $Opacity: 2,
        $Round: {
            $Rotate: .8
        }
    }, a["T|IE*IE"] = {
        $Duration: 1800,
        y: .8,
        $Zoom: 11,
        $Rotate: -1.5,
        $Easing: {
            $Top: $JssorEasing$.$EaseInOutElastic,
            $Zoom: $JssorEasing$.$EaseInElastic,
            $Rotate: $JssorEasing$.$EaseInOutElastic
        },
        $Opacity: 2,
        $During: {
            $Zoom: [0, .8],
            $Opacity: [0, .7]
        },
        $Round: {
            $Rotate: .5
        }
    }, a["RTTS|R"] = {
        $Duration: 900,
        x: -.6,
        $Zoom: 1,
        $Rotate: 1,
        $Easing: {
            $Left: $JssorEasing$.$EaseInQuad,
            $Zoom: $JssorEasing$.$EaseInQuad,
            $Rotate: $JssorEasing$.$EaseInQuad,
            $Opacity: $JssorEasing$.$EaseOutQuad
        },
        $Opacity: 2,
        $Round: {
            $Rotate: 1.2
        }
    }, a["RTTS|T"] = {
        $Duration: 900,
        y: .6,
        $Zoom: 1,
        $Rotate: 1,
        $Easing: {
            $Top: $JssorEasing$.$EaseInQuad,
            $Zoom: $JssorEasing$.$EaseInQuad,
            $Rotate: $JssorEasing$.$EaseInQuad,
            $Opacity: $JssorEasing$.$EaseOutQuad
        },
        $Opacity: 2,
        $Round: {
            $Rotate: 1.2
        }
    }, a["DDGDANCE|RB"] = {
        $Duration: 1800,
        x: -.3,
        y: -.3,
        $Zoom: 1,
        $Easing: {
            $Left: $JssorEasing$.$EaseInJump,
            $Top: $JssorEasing$.$EaseInJump,
            $Zoom: $JssorEasing$.$EaseOutQuad
        },
        $Opacity: 2,
        $During: {
            $Left: [0, .8],
            $Top: [0, .8]
        },
        $Round: {
            $Left: .8,
            $Top: 2.5
        }
    }, a["ZMF|10"] = {
        $Duration: 900,
        $Zoom: 11,
        $Easing: {
            $Zoom: $JssorEasing$.$EaseInExpo,
            $Opacity: $JssorEasing$.$EaseLinear
        },
        $Opacity: 2
    }, a["DDG|TR"] = {
        $Duration: 1200,
        x: -.3,
        y: .3,
        $Zoom: 1,
        $Easing: {
            $Left: $JssorEasing$.$EaseInJump,
            $Top: $JssorEasing$.$EaseInJump
        },
        $Opacity: 2,
        $During: {
            $Left: [0, .8],
            $Top: [0, .8]
        },
        $Round: {
            $Left: .8,
            $Top: .8
        }
    }, a["FLTTR|R"] = {
        $Duration: 900,
        x: -.2,
        y: -.1,
        $Easing: {
            $Left: $JssorEasing$.$EaseLinear,
            $Top: $JssorEasing$.$EaseInWave
        },
        $Opacity: 2,
        $Round: {
            $Top: 1.3
        }
    }, a["FLTTRWN|LT"] = {
        $Duration: 1800,
        x: .5,
        y: .2,
        $Zoom: 1,
        $Easing: {
            $Left: $JssorEasing$.$EaseInOutSine,
            $Top: $JssorEasing$.$EaseInWave,
            $Zoom: $JssorEasing$.$EaseInOutQuad
        },
        $Opacity: 2,
        $During: {
            $Left: [0, .7],
            $Top: [.1, .7]
        },
        $Round: {
            $Top: 1.3
        }
    }, a["ATTACK|BR"] = {
        $Duration: 1500,
        x: -.1,
        y: -.5,
        $Zoom: 1,
        $Easing: {
            $Left: $JssorEasing$.$EaseOutWave,
            $Top: $JssorEasing$.$EaseInExpo
        },
        $Opacity: 2,
        $During: {
            $Left: [.3, .7],
            $Top: [0, .7]
        },
        $Round: {
            $Left: 1.3
        }
    }, a.CLIP = {
        $Duration: 900,
        $Clip: 3,
        $Easing: {
            $Clip: $JssorEasing$.$EaseLinear
        },
        $Opacity: 2
    }, a.FADE = {
        $Duration: 900,
        $Opacity: 2
    };
    var o = {
            $FillMode: 0,
            $AutoPlay: !0,
            $AutoPlayInterval: 1e3,
            $PauseOnHover: !1,
            $ArrowKeyNavigation: !0,
            $SlideEasing: $JssorEasing$.$EaseOutQuint,
            $SlideDuration: 0,
            $MinDragOffsetToSlide: 20,
            $SlideSpacing: 0,
            $DisplayPieces: 1,
            $ParkingPosition: 0,
            $UISearchMode: 1,
            $PlayOrientation: 0,
            $DragOrientation: 1,
            $SlideshowOptions: {
                $Class: $JssorSlideshowRunner$,
                $Transitions: s,
                $TransitionsOrder: 1,
                $ShowLink: !0
            },
            $CaptionSliderOptions: {
                $Class: $JssorCaptionSlider$,
                $CaptionTransitions: a,
                $PlayInMode: 1,
                $PlayOutMode: 1
            },
            $BulletNavigatorOptions: {
                $Class: $JssorBulletNavigator$,
                $ChanceToShow: 2,
                $AutoCenter: 1,
                $Steps: 1,
                $Lanes: 1,
                $SpacingX: 8,
                $SpacingY: 8,
                $Orientation: 1
            },
            $ArrowNavigatorOptions: {
                $Class: $JssorArrowNavigator$,
                $ChanceToShow: 0,
                $AutoCenter: 2,
                $Steps: 1
            }
        },
        i = new $JssorSlider$("slider1_container", o);

    function n() {
        var $ = document.body.clientWidth;
        $ ? i.$ScaleWidth(Math.min($, 2090)) : window.setTimeout(n, 30)
    }
    n(), $(window).bind("load", n), $(window).bind("resize", n), $(window).bind("orientationchange", n)
});