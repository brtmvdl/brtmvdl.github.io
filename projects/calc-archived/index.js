import { nElement,nButton, nFlex, nH1, nInputTextGroup, nSelectGroup } from '../../js/nelement/index.js'
import * as COLORS from '../../libs/colors.js'

nElement.fromElement(document.body)
  .setStyle('margin', '0rem')

const app = nElement.fromId('app')

const header = new nElement()
header.setStyle('background-color', COLORS.BLACK_1)
header.setStyle('color', COLORS.WHITE_1)
header.setStyle('padding', '1rem')
app.append(header)

const title = new nH1()
title.setText('Calc')
title.setStyle('text-align', 'center')
header.append(title)

const body = new nElement()
body.setStyle('margin', '1rem auto')
body.setStyle('width', '40rem')
app.append(body)

class Service {
  name = ''
  hours = 1

  constructor({
    name = '',
    hours = 1,
  } = {}) {
    this.name = name
    this.hours = hours
  }
}

class Project {
  domain = null
  contract = 1

  fronts = []
  backs = []
  others = []

  onDelete = null

  constructor({
    domain = '',
    contract = 1,
    onDelete = () => { },
  } = {}) {
    this.domain = domain
    this.contract = contract
    //
    this.onDelete = onDelete
  }

  isValid() {
    return Object.keys(this.getErrors()).length === 0
  }

  getErrors() {
    const errors = {}

    if (!this.domain) {
      errors['domain'] = 'invalid domain name'
    }

    if (this.contract < 1) {
      errors['contract'] = 'invalid contract time'
    }

    return errors
  }

  getContractYears() {
    return `${this.contract} year${this.contract > 1 ? 's' : ''}`
  }

  getElement() {
    const el = new nElement()
    el.setText(`${this.domain} - ${this.getContractYears()}`)
    return el
  }
}

const periods = {
  '01': '1 year',
  '03': '3 years',
  '05': '5 years',
  '10': '10 years',
}

class Page {
  projects = []

  projectsEl = new nElement()

  getElement() {
    const el = new nElement

    const flex = new nFlex()
    el.append(flex)

    const domain = new nInputTextGroup()
    domain.setContainerStyle('width', '80%')
    domain.children.label.setText('Domain:')
    domain.children.input.setPlaceholder('domain.com')
    domain.children.input.setStyle('padding', '1em 0em')
    domain.children.error.setStyle('padding', '1em 0em')
    flex.append(domain)

    const contract = new nSelectGroup()
    contract.children.label.setText('Contract:')
    contract.children.select.setStyle('padding', '1em 0em')
    contract.children.select.setStyle('background-color', COLORS.WHITE_1)
    contract.children.select.addOption('01', periods['01'])
    contract.children.select.addOption('03', periods['03'])
    contract.children.select.addOption('05', periods['05'])
    contract.children.select.addOption('10', periods['10'])
    flex.append(contract)

    const button = new nButton()
    button.setStyle('width', '100%')
    button.setStyle('border-radius', 'calc(1em / 4)')
    button.setStyle('background-color', COLORS.BLACK_1)
    button.setStyle('color', COLORS.WHITE_1)
    button.setText('add project')
    button.on('click', () => {
      domain.error.setText('')

      const project = new Project({
        domain: domain.input.getValue(),
        contract: +contract.input.getValue(),
      })

      if (project.isValid()) {
        this.projects.push(project)
        this.updateProjects()

        domain.input.setValue('')
        contract.input.setValue('01')
      } else {
        const errors = project.getErrors()

        if (errors.domain) {
          domain.error.setText(errors.domain)
        }

        if (errors.contract) {
          contract.error.setText(errors.contract)
        }
      }
    })
    el.append(button)

    el.append(this.projectsEl)
    this.updateProjects()

    return el
  }

  updateProjects() {
    this.projectsEl.clear()

    if (this.projects.length > 0) {
      this.projects.map((p) => {
        this.projectsEl.append(p.getElement())
      })
    } else {
      const noProjects = new nElement()
      noProjects.setStyle('padding', '1em')
      noProjects.setStyle('text-align', 'center')
      noProjects.setText('no projects')
      this.projectsEl.append(noProjects)
    }
  }
}

const page = new Page()
body.append(page.getElement())
