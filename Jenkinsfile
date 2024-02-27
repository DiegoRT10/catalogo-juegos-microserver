pipeline {
    agent any
    tools {
        nodejs "node"
    }
    stages {
        stage('install dependencias'){
            steps{
                sh 'npm install'
            }
        }
        stage('Espera 10 segundos a que levante la BD') {
            steps {
                sh 'sleep 10'
            }
        }
        stage('prueba unitaria'){
            steps{
                sh 'npm test'
            }
        }
   
       
    }
}