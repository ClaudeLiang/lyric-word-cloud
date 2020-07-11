<template>
  <div id='word-cloud-container' style='height: 500px;'></div>
</template>

<script>
import echarts from 'echarts'
import 'echarts-wordcloud/dist/echarts-wordcloud.min'

export default {
  name: 'WordCloud',
  data () {
    return {
      containerId: 'word-cloud-container',
      words: [],
      chart: null
    }
  },
  created () {
    window.fetch('/words').then(response => {
      return response.json()
    }).then(data => {
      this.words = data
    }).catch(err => {
      console.error(err)
    })
  },
  mounted () {
    this.initChart()
  },
  watch: {
    words () {
      this.initChart()
    }
  },
  methods: {
    initChart () {
      this.chart = echarts.init(document.getElementById(this.containerId))
      this.chart.setOption({
        series: [{
          type: 'wordCloud',
          shape: 'smooth',
          left: 'center',
          top: 'center',
          width: '100%',
          height: '100%',
          right: null,
          bottom: null,
          size: ['50%', '50%'],
          rotationRange: [-45, 0, 45, 90],
          gridSize: 8,
          textStyle: {
            normal: {
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              color: function () {
                return 'rgb(' + [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)
                ].join(',') + ')'
              }
            },
            emphasis: {
              shadowBlur: 5,
              shadowColor: '#333'
            }
          },
          data: this.words
        }]
      })
    }
  }
}
</script>
