import { nButton, nElement, nFlex, nH1, nInputTextGroup, nSelectGroup } from '../../js/nElement/index.js'
import * as COLORS from '../../libs/colors.js'

nElement.fromElement(document.body)
  .setStyle('margin', '0rem')

const app = nElement.fromId('app')

const header = new nElement()
header.setStyle('background-color', COLORS.BLACK)
header.setStyle('color', COLORS.WHITE)
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

// const projects = [
// ]

// const projectsEl = new nElement()
// body.append(projectsEl)

// const updateProjects = () => {
//   projectsEl.clear()

//   if (projects.length > 0) {
//     projects.map((p, ix) => {
//       const proj = new nElement()
//       proj.setStyle('box-shadow', ['0em', '0em', '0em', 'calc(1em / 8)', COLORS.BLACK].join(' '))
//       proj.setStyle('margin', '1em 0em')
//       proj.setStyle('padding', '1em')

//       const projHeader = new nFlex()
//       proj.append(projHeader)

//       const projTitle = new nElement()
//       projTitle.setText(`${p.domain} - ${periods[p.period]}`)
//       projHeader.append(projTitle)

//       const projDelete = new nElement()
//       projDelete.setText('delete')
//       projDelete.setStyle('color', COLORS.RED)
//       projDelete.setStyle('cursor', 'pointer')
//       projDelete.on('click', () => {
//         const projs = projects.filter((_, pIx) => pIx != ix)
//         while (projects.length > 0) projects.pop()
//         projs.map((p) => projects.push(p))

//         updateProjects()
//       })
//       projHeader.append(projDelete)

//       const projBody = new nElement()
//       proj.append(projBody)

//       projectsEl.append(proj)
//     })
//   } else {
//     const noProjectst = new nElement()
//     noProjectst.setText('no projects')
//     noProjectst.setStyle('padding', '1em 0em')
//     noProjectst.setStyle('text-align', 'center')
//     projectsEl.append(noProjectst)
//   }
// }

// updateProjects(projects)

// // // //

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
    domain.label.setText('Domain:')
    domain.input.setPlaceholder('domain.com')
    domain.input.setStyle('padding', '1em 0em')
    domain.error.setStyle('padding', '1em 0em')
    flex.append(domain)

    const contract = new nSelectGroup()
    contract.label.setText('Contract:')
    contract.select.setStyle('padding', '1em 0em')
    contract.select.setStyle('background-color', COLORS.WHITE)
    contract.select.addOption('01', periods['01'])
    contract.select.addOption('03', periods['03'])
    contract.select.addOption('05', periods['05'])
    contract.select.addOption('10', periods['10'])
    flex.append(contract)

    const button = new nButton()
    button.setStyle('width', '100%')
    button.setStyle('border-radius', 'calc(1em / 4)')
    button.setStyle('background-color', COLORS.BLACK)
    button.setStyle('color', COLORS.WHITE)
    button.setText('add project')
    button.on('click', () => {
      domain.error.setText('')

      const project = new Project({
        domain: domain.input.getValue(),
        contract: +contract.select.getValue(),
      })

      if (project.isValid()) {
        this.projects.push(project)
        this.updateProjects()

        domain.input.setValue('')
        contract.select.setValue('01')
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
