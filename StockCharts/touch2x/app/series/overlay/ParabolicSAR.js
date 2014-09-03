/**
 * @class Chartsly.series.overlay.ParabolicSAR
 * @extends Ext.chart.series.Cartesian
 *
 * ParabolicSAR (PSAR) series that iterates the store records and calculates the SAR value
 *
 * For more detail, refer to http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:parabolic_sar
 *
 * The calculated SAR value is set as "sar" field on the record
 *
 * TODO: Parameterise AF, Max AF. This shall use the ParabolocSAR sprite to draw uptrend and downtrend
 * lines in one iteration of the store records.
 */
Ext.define('Chartsly.series.overlay.ParabolicSAR', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.parabolicsar',
    seriesType: 'lineSeries',

    config: {
        /*
         * Data field containing the high value. Defaults to "high"
         */
        highField: "high",
        /*
         * Data field containing the low value. Defaults to "low"
         */
        lowField: "low"
    },

    /*
     * Creats a SAR series
     * @param {Object} [config] Configuration
     */
    constructor: function (config) {

        var me = this;

        var sar = 0, prevSar, prevHigh0, prevHigh, prevLow0, prevLow, high, low, 
            af = 0.02, prevAf, ep, prevEp, uptrend = false, prevUptrend = false, 
            prevUptrend0 = true, maxHigh, minLow;

        var st = Ext.data.StoreManager.lookup(config.store);
        var recs = st.getRange();

        Ext.Array.each(recs, function (item, index) {
            high = item.data[config.highField];
            low = item.data[config.lowField];

            //identify initial trend
            if (index <= 1) {
                if (prevHigh && high > prevHigh) {
                    console.log('UP'); 

                    uptrend = true;

                    sar = prevLow;
                    ep = high;

                    prevUptrend = true;
                    
                }

                if (prevHigh && high < prevHigh) {
                    console.log('DOWN'); 

                    uptrend = false;

                    sar = prevHigh;
                    ep = low;

                    prevUptrend = false;
                                        
                }
                maxHigh = high;
                minLow = low;
            } else {
                //calculate SAR
                // sar = prevSar - (prevAf * (prevSar - prevEp));
                if (prevUptrend == prevUptrend0) {
                    if (prevUptrend) {
                        var t1 = prevSar + (prevAf * (prevEp - prevSar));
                        var t2 = Ext.Array.min([prevLow, prevLow0]);
                        if (t1 < t2) {
                            sar = t1;
                        } else {
                            sar = t2;
                        }
                    } else {
                        var t1 = prevSar + (prevAf * (prevEp - prevSar));
                        var t2 = Ext.Array.max([prevHigh, prevHigh0]);
                        if (t1 > t2) {
                            sar = t1;
                        } else {
                            sar = t2;
                        }
                    }
                } else {
                    sar = prevEp;
                }

                item.data.sar = sar;

                //calculate EP
                if (prevUptrend) {
                    if (high > prevEp) {
                        ep = high;
                    } else {
                        ep = prevEp;
                    }
                } else {
                    if (low < prevEp) {
                        ep = low;
                    } else {
                        ep = prevEp;
                    }
                }

                //detect trend based on SAR
                if (prevUptrend) {
                    if (low > sar) {
                        uptrend = true;
                    } else {
                        uptrend = false;
                    }
                } else {
                    if (high < sar) {
                        uptrend = false;
                    } else {
                        uptrend = true;
                    }
                }

                //calculate AF
                if (uptrend == prevUptrend) {
                    if (uptrend) {
                        if (ep > prevEp) {
                            if (prevAf == 0.20) {
                                af = prevAf;
                            } else {
                                af = prevAf + 0.02;
                            }
                        } else {
                            af = prevAf;
                        }
                    } else {
                        if (ep < prevAf) {
                            if (prevAf = 0.20) {
                                af = prevAf;
                            } else {
                                af = prevAf + 0.02;
                            }
                        } else {
                            af = prevAf;
                        }
                    }
                } else {
                    af = 0.02;
                }

                console.log('H: ' + high + ' L: ' + low + ' EP: ' + ep + ' AF: ' + af + ' SAR: ' + item.data.sar);
            }

            prevHigh0 = prevHigh;
            prevHigh = high;
            prevLow0 = prevLow;
            prevLow = low;
            prevEp = ep;
            prevSar = sar;
            prevAf = af;
            prevUptrend0 = prevUptrend;
            prevUptrend = uptrend;
        });

        this.callParent(arguments);
    }
});