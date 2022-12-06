import { init as initApm } from '@elastic/apm-rum'
var apm = initApm({
 serviceName: 'Marvel-Front-End',
 // Defina a versão da sua aplicação
 // Usado no APM Server para encontrar o mapa de origem correto
 serviceVersion: '0.90',
 // Definir URL customizado do APM Server (padrão: http://localhost:8200)
 serverUrl: 'http://localhost:8200',
 distributedTracingOrigins: ['http://localhost:8080'],
})
export default apm;