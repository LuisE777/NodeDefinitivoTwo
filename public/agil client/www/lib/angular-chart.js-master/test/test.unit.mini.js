describe("Unit testing",function(){"use strict";var a,e,t,r,s;beforeEach(module("chart.js",function(a){(s=a).setOptions({env:"test",responsive:!1})})),beforeEach(inject(function(s,c,o){a=s,e=c,r=o,t=sinon.sandbox.create()})),afterEach(function(){t.restore()}),describe("base",function(){describe("chart types",function(){["line","bar","horizontalBar","radar","pie","doughnut","polarArea","bubble"].forEach(function(s){it("creates a "+s+" chart using the directive",function(){var c='<canvas class="chart chart-'+("polarArea"===s?"polar-area":"horizontalBar"===s?"horizontal-bar":s)+'" chart-data="data" chart-labels="labels"></canvas>';["line","bar","horizontalBar","radar"].indexOf(s)>-1?(e.labels=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],e.data=[[65,59,80,81,56,55,40],[28,48,40,19,86,27,90]]):(e.labels=["Downloads","In store","Mail orders"],e.data=[300,500,100]);var o=t.spy(r,"Chart");e.$on("chart-create",function(a,e){expect(e).to.be.an.instanceOf(Chart.Controller)}),a(c)(e),e.$digest(),expect(o).to.have.been.calledWithNew,expect(o).to.have.been.calledWithExactly(sinon.match.any,sinon.match({type:s,data:sinon.match.object,options:sinon.match.object}))}),it("creates a "+s+' chart using the "chart-type" attribute',function(){e.type=s,["line","bar","horizontalBar","radar"].indexOf(s)>-1?(e.labels=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],e.data=[[65,59,80,81,56,55,40],[28,48,40,19,86,27,90]]):(e.labels=["Downloads","In store","Mail orders"],e.data=[300,500,100]);var c=t.spy(r,"Chart");e.$on("chart-create",function(a,e){expect(e).to.be.an.instanceOf(Chart.Controller)}),a('<div style="width: 250px; height:120px"><canvas class="chart chart-base" chart-data="data" chart-labels="labels" chart-type="type"></canvas></div>')(e),e.$digest(),expect(c).to.have.been.calledWithNew,expect(c).to.have.been.calledWithExactly(sinon.match.any,sinon.match({type:s,data:sinon.match.object,options:sinon.match.object}))})})}),describe("dataset override",function(){it("overrides the datasets for complex charts",function(){var t;e.labels=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],e.data=[[65,-59,80,81,-56,55,-40],[28,48,-40,19,86,27,90]],e.datasetOverride=[{label:"Bar chart",borderWidth:1,type:"bar"},{label:"Line chart",borderWidth:3,type:"line"}],e.$on("chart-create",function(a,e){t=e.chart.config.data.datasets}),a('<canvas class="chart chart-bar" chart-data="data" chart-labels="labels" chart-dataset-override="datasetOverride"></canvas>')(e),e.$digest(),expect(t[0].label).to.equal("Bar chart"),expect(t[1].label).to.equal("Line chart"),expect(t[0].borderWidth).to.equal(1),expect(t[1].borderWidth).to.equal(3),expect(t[0].type).to.equal("bar"),expect(t[1].type).to.equal("line")}),it("overrides the dataset for simple charts",function(){var t;e.colors=["#45b7cd","#ff6384","#ff8e72"],e.labels=["Download Sales","In-Store Sales","Mail-Order Sales"],e.data=[350,450,100],e.datasetOverride={hoverBackgroundColor:["#45b7cd","#ff6384","#ff8e72"],hoverBorderColor:["#45b7cd","#ff6384","#ff8e72"]},e.$on("chart-create",function(a,e){t=e.chart.config.data.datasets}),a('<canvas class="chart chart-doughnut" chart-data="data" chart-labels="labels" chart-colors="colors" chart-dataset-override="datasetOverride"></canvas>')(e),e.$digest(),expect(t[0].hoverBackgroundColor).to.deep.equal(["#45b7cd","#ff6384","#ff8e72"]),expect(t[0].hoverBorderColor).to.deep.equal(["#45b7cd","#ff6384","#ff8e72"])})})}),describe("lifecycle",function(){it("watches the attributes of the chart",function(){e.labels=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],e.data=[[65,59,80,81,56,55,40],[28,48,40,19,86,27,90]];var r=t.spy(e,"$watch");a('<div style="width: 250px; height:120px"><canvas class="chart chart-line" chart-data="data" chart-labels="labels" chart-type="type"></canvas></div>')(e),expect(r.calledThrice).to.be.true}),it("creates the chart only once",function(){var t=0;e.labels=["January","February","March","April","May","June","July"],e.series=["Series A","Series B"],e.data=[[65,59,80,81,56,55,40],[28,48,40,19,86,27,90]],e.$on("chart-create",function(){t++}),a('<div style="width: 250px; height:120px"><canvas class="chart chart-line" chart-data="data" chart-labels="labels" chart-series="series"></canvas></div>')(e),e.$digest(),expect(t).to.equal(1)}),it("updates the chart",function(){var t=0;e.labels=["January","February","March","April","May","June","July"],e.series=["Series A","Series B"],e.data=[[65,59,80,81,56,55,40],[28,48,40,19,86,27,90]],e.$on("chart-update",function(){t++}),a('<div style="width: 250px; height:120px"><canvas class="chart chart-line" chart-data="data" chart-labels="labels" chart-series="series"></canvas></div>')(e),e.$digest(),e.data=[[28,48,40,19,86,27,90],[65,59,80,81,56,55,40]],e.$digest(),expect(t).to.equal(1)}),it("destroy the chart if all data is removed",function(){var t=0,r=0,s=0;e.labels=["January","February","March","April","May","June","July"],e.data=[[65,59,80,81,56,55,40],[28,48,40,19,86,27,90]],e.$on("chart-create",function(){t++}),e.$on("chart-update",function(){r++}),e.$on("chart-destroy",function(){s++}),a('<div style="width: 250px; height:120px"><canvas class="chart chart-line" chart-data="data" chart-labels="labels"></canvas></div>')(e),e.$digest(),e.data=[],e.$digest(),expect(t).to.equal(1),expect(r).to.equal(0),expect(s).to.equal(1)}),it("re-create the chart if data added or removed",function(){var t=0,r=0,s=0;e.labels=["January","February","March","April","May","June","July"],e.data=[[65,59,80,81,56,55,40],[28,48,40,19,86,27,90]],e.$on("chart-create",function(){t++}),e.$on("chart-update",function(){r++}),e.$on("chart-destroy",function(){s++}),a('<div style="width: 250px; height:120px"><canvas class="chart chart-line" chart-data="data" chart-labels="labels" chart-series="series"></canvas></div>')(e),e.$digest(),e.data=[[28,48,40,19,86,27,90],[65,59,80,81,56,55,40],[65,59,80,81,56,55,40]],e.$digest(),expect(t).to.equal(2),expect(r).to.equal(0),expect(s).to.equal(1)}),it("should allow to set a configuration",function(){s.setOptions({responsive:!1}),expect(r.getOptions().responsive).to.equal(!1),expect(r.getOptions("Line").responsive).to.equal(!1),s.setOptions({responsive:!0}),expect(r.getOptions().responsive).to.equal(!0),expect(r.getOptions("Line").responsive).to.equal(!0)}),it("should allow to set a configuration for a chart type",function(){s.setOptions("Line",{responsive:!1}),expect(r.getOptions("Line").responsive).to.equal(!1),s.setOptions("Line",{responsive:!0}),expect(r.getOptions("Line").responsive).to.equal(!0)}),["labels","colors","series","options"].forEach(function(t){it("re-creates the chart on "+t+" changes",function(){var r=0;switch(e.options={scaleShowVerticalLines:!1},e.labels=["January","February","March","April","May","June","July"],e.series=["Series A","Series B"],e.colors=["#45b7cd","#ff6384"],e.data=[[65,59,80,81,56,55,40],[28,48,40,19,86,27,90]],e.$on("chart-create",function(){r++}),a('<div style="width: 250px; height:120px"><canvas class="chart chart-line" chart-data="data" chart-labels="labels" chart-series="series" chart-colors="colors" chart-options="options"></canvas></div>')(e),e.$digest(),t){case"labels":e.labels=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];break;case"colors":e.colors=["#ff6384","#ff8e72"];break;case"series":e.series=["Series C","Series D"];break;case"options":e.options={scaleShowVerticalLines:!0}}e.$digest(),expect(r).to.equal(2)})}),["labels","colors","series","options"].forEach(function(t){it("does not re-create the chart on "+t+" not changed",function(){var r=0;switch(e.options={scaleShowVerticalLines:!1},e.labels=["January","February","March","April","May","June","July"],e.series=["Series A","Series B"],e.colors=["#45b7cd","#ff6384"],e.data=[[65,59,80,81,56,55,40],[28,48,40,19,86,27,90]],e.$on("chart-create",function(){r++}),a('<div style="width: 250px; height:120px"><canvas class="chart chart-line" chart-data="data" chart-labels="labels" chart-series="series" chart-colors="colors" chart-options="options"></canvas></div>')(e),e.$digest(),t){case"labels":e.labels=["January","February","March","April","May","June","July"];break;case"colors":e.colors=["#45b7cd","#ff6384"];break;case"series":e.series=["Series A","Series B"];break;case"options":e.options={scaleShowVerticalLines:!1}}e.$digest(),expect(r).to.equal(1)})})})});