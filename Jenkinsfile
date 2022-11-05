#!/usr/bin/env groovy

pipeline {
    agent any
    options {
	buildDiscarder(logRotator(numToKeepStr: '4'))
    }
    environment {
	// Locale for yarn and mocha
	LANGUAGE='en_GB.UTF-8'
	LANG='en_GB.UTF-8'
	XTERM_LOCALE='en_GB.UTF-8'
	LC_ALL='en_GB.UTF-8'
    }

    stages {
	stage('Environment') {
	    steps {
		sh('yarn')
	    }
	}
	stage('Lint') {
	    steps {
		sh('yarn lint')
	    }
	}
	stage('Build') {
	    steps {
		sh('yarn build')
	    }
	}
/*
  stage('Test') {
	    steps {
		sh('yarn test')
		xunit([
		    JUnit(
			deleteOutputFiles: true,
			failIfNotNew: true,
			skipNoTestFiles: false,
			stopProcessingIfError: true,
			pattern: '*.xml')])
	    }
	}
	*/
	stage('Publish') {
	    when {
		branch 'main'
	    }
	    steps {
		withCredentials([gitUsernamePassword(credentialsId: 'adb74b07-7ecf-4c3d-847f-1a8159fc5071', gitToolName: 'Default')]) {
		    sh('./scripts/publish.sh')
		}
	    }
	}
    }
    post {
	always {
	    cleanWs()
	}
    }

}
