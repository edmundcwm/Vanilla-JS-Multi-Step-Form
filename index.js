(function() {
  let DOM = {};
  let state = {
    currentStep: 0, // this is used to control the active progress label, active fields and active buttons
    errorMsg: ''
  };

  function cachedDOM() {
    DOM.form = document.getElementById('form');
    DOM.nextBtn = document.getElementById('next');
    DOM.prevBtn = document.getElementById('previous');
    DOM.submitBtn = document.getElementById('submit');
    DOM.stepBtns = document.querySelectorAll('.step-btn');
    DOM.progress = document.querySelectorAll('#progress > li');
    DOM.sections = document.querySelectorAll('.section');
    DOM.error = document.getElementById('error');
  }

  function resetError() {
    state.errorMsg = '';
  }

  // Basic form validation
  function validateForm(inputs) {
    resetError();
    let error = false;
    inputs.forEach(input => {
      if (!input.value.length) {
        state.errorMsg = 'Input cannot be empty';
        error = true;
      }
    });
    return error;
  }

  function nextStep() {
    resetError();
    const inputs = DOM.sections[state.currentStep].querySelectorAll('input');
    const validation = validateForm(inputs);
    if (validation) {
      return;
    }
    state.currentStep += 1;
  }

  function prevStep() {
    resetError();
    state.currentStep -= 1;
  }

  function getCurrentStep() {
    return state.currentStep;
  }

  // Logic to determine what buttons to be displayed
  function buttonsToDisplay() {
    const activeStep = getCurrentStep();
    const totalSections = DOM.sections.length - 1;
    const btns = [];
    // Display "next" btn if form is not at the last step
    if (activeStep !== totalSections) {
      btns.push(DOM.nextBtn);
    }

    // Display "previous" btn if form is not at the first step
    if (activeStep !== 0) {
      btns.push(DOM.prevBtn);
    }

    // Display "submit" btn if form is at the last step
    if (activeStep === totalSections) {
      btns.push(DOM.submitBtn);
    }
    return btns;
  }

  // Render Buttons
  function renderBtns() {
    // hide all buttons on render
    DOM.stepBtns.forEach(btn => btn.classList.remove('active'));
    const btns = buttonsToDisplay();
    // display relevant buttons
    btns.map(btn => btn.classList.toggle('active'));
  }

  // Render Inputs
  function renderSections() {
    const activeStep = getCurrentStep();
    DOM.sections.forEach(section => section.classList.remove('active'));
    DOM.sections[activeStep].classList.add('active');
  }

  // Render Progress
  function renderProgress() {
    const activeStep = getCurrentStep();
    DOM.progress.forEach(item => {
      item.classList.remove('active');
    });
    DOM.progress[activeStep].classList.add('active');
  }

  function renderError() {
    DOM.error.innerText = state.errorMsg;
  }

  // Render UI
  function render() {
    renderBtns();
    renderProgress();
    renderSections();
    renderError();
  }

  // Handle Form submission
  function handleSubmit() {
    DOM.form.innerHTML = '<h2>Form successfully submitted!</h2>';
  }

  // Init form
  function init() {
    cachedDOM();
    DOM.stepBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        switch (btn.id) {
          case 'next':
            nextStep();
            break;

          case 'previous':
            prevStep();
            break;

          case 'submit':
            handleSubmit();
            break;

          default:
            break;
        }
        // re-render UI
        render();
      });
    });
    render();
  }

  // Init
  init();
})();
