REPORTER = spec
MOCHA = ./node_modules/.bin/mocha
SAILS = ./node_modules/.bin/sails
WATERLOCK = ./node_modules/.bin/waterlock
JSHINT = ./node_modules/.bin/jshint
ISTANBUL = ./node_modules/.bin/istanbul
TESTAPP = _testapp

ifeq (true,$(COVERAGE))
test: jshint coverage
else
test: jshint provision base clean
endif

base:
	@echo "+------------------------------------+"
	@echo "| Running mocha tests                |"
	@echo "+------------------------------------+"
	@NODE_ENV=test $(MOCHA) \
	--colors \
    --reporter $(REPORTER) \
    --recursive \
	
coveralls:
	@echo "+------------------------------------+"
	@echo "| Running mocha tests with coveralls |"
	@echo "+------------------------------------+"
	@NODE_ENV=test $(ISTANBUL) \
	cover ./node_modules/mocha/bin/_mocha \
	--report lcovonly \
	-- -R $(REPORTER) \
	--recursive && \
	cat ./coverage/lcov.info |\
	 ./node_modules/coveralls/bin/coveralls.js && \
	 rm -rf ./coverage

provision:
	@echo "+------------------------------------+"
	@echo "| Provisioning                       |"
	@echo "+------------------------------------+"
	$(SAILS) new $(TESTAPP)
	cd $(TESTAPP) && \
	npm install ../ && \
	npm install git+https://git@github.com/waterlock/waterlock-local-auth.git  && \
	$(WATERLOCK) generate all

localauth:
	npm install git@github.com:waterlock/waterlock-local-auth.git 

jshint:
	@echo "+------------------------------------+"
	@echo "| Running linter                     |"
	@echo "+------------------------------------+"
	$(JSHINT) lib bin test

clean:
	@echo "+------------------------------------+"
	@echo "| Cleaning up                        |"
	@echo "+------------------------------------+"
	rm -rf $(TESTAPP)
	rm -rf coverage

coverage: provision coveralls clean


.PHONY: test base coveralls coverage provision
