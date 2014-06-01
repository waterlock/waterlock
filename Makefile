REPORTER = spec
TESTS = $(shell find ./tests/* -name "*.test.js")
MOCHA = ./node_modules/.bin/mocha
SAILS = ./node_modules/.bin/sails
WATERLOCK = ./node_modules/.bin/waterlock
JSHINT = ./node_modules/.bin/jshint

ifeq (true,$(COVERAGE))
test: jshint coverage
else
test: jshint provision base clean
endif

base:
	@echo "running mocha tests..."
	@NODE_ENV=test $(MOCHA) \
	--colors \
    --reporter $(REPORTER) \
    --recursive \
	$(TESTS) 
	
coveralls:
	@echo "running mocha tests with coveralls..."
	@NODE_ENV=test istanbul \
	cover ./node_modules/mocha/bin/_mocha \
	--report lcovonly \
	-- -R spec \
	--recursive \
	$(TESTS) && \
	cat ./coverage/lcov.info |\
	 ./node_modules/coveralls/bin/coveralls.js && \
	 rm -rf ./coverage

provision:
	@echo "provisioning..."
	$(SAILS) new _testapp
	cd _testapp && \
	pwd && \
	npm install ../ && \
	npm install git+https://git@github.com/davidrivera/waterlock-local-auth.git  && \
	$(WATERLOCK) install all

localauth:
	npm install git@github.com:davidrivera/waterlock-local-auth.git 

jshint:
	@echo "running lint..."
	$(JSHINT) lib	

clean:
	@echo "clean..."
	rm -rf _testapp

coverage: provision coveralls clean


.PHONY: test base coveralls coverage provision