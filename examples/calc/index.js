import { nButton, nElement, nFlex, nH1, nH2, nImage, nInputTextGroup, nSelectGroup } from '../../js/nElement.js'
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

const domain = new nFlex()
body.append(domain)

const dInput = new nInputTextGroup()
dInput.setContainerStyle('width', '80%')
dInput.label.setText('Domain:')
dInput.input.setPlaceholder('domain.com')
dInput.input.setStyle('padding', '1em 0em')
dInput.error.setStyle('padding', '1em 0em')
domain.append(dInput)

const periods = {
  '01': '1 year',
  '03': '3 years',
  '05': '5 years',
  '10': '10 years',
}

const dPeriod = new nSelectGroup()
dPeriod.label.setText('Contract:')
dPeriod.select.setStyle('padding', '1em 0em')
dPeriod.select.setStyle('background-color', COLORS.WHITE)
dPeriod.select.addOption('01', periods['01'])
dPeriod.select.addOption('03', periods['03'])
dPeriod.select.addOption('05', periods['05'])
dPeriod.select.addOption('10', periods['10'])
domain.append(dPeriod)

const addProjectButton = new nButton()
addProjectButton.setStyle('width', '100%')
addProjectButton.setStyle('border-radius', 'calc(1em / 4)')
addProjectButton.setStyle('background-color', COLORS.BLACK)
addProjectButton.setStyle('color', COLORS.WHITE)
addProjectButton.setStyle('')
addProjectButton.setText('add project')
addProjectButton.on('click', () => {
  dInput.error.setText('')

  const domain = dInput.input.getValue()
  const period = dPeriod.select.getValue()

  if (!domain) {
    dInput.error.setText('invalid domain')
    return
  }

  projects.push({ domain, period })
  updateProjects(projects)

  dInput.input.setValue('')
  dPeriod.select.setValue('01')
})
body.append(addProjectButton)

const projects = [
]

const projectsEl = new nElement()
body.append(projectsEl)

const updateProjects = () => {
  projectsEl.clear()

  if (projects.length > 0) {
    projects.map((p, ix) => {
      const proj = new nElement()
      proj.setStyle('box-shadow', ['0em', '0em', '0em', 'calc(1em / 8)', COLORS.BLACK].join(' '))
      proj.setStyle('margin', '1em 0em')
      proj.setStyle('padding', '1em')

      const projHeader = new nFlex()
      proj.append(projHeader)

      const projTitle = new nElement()
      projTitle.setText(`${p.domain} - ${periods[p.period]}`)
      projHeader.append(projTitle)

      const projDelete = new nElement()
      projDelete.setText('delete')
      projDelete.setStyle('color', COLORS.RED)
      projDelete.setStyle('cursor', 'pointer')
      projDelete.on('click', () => {
        const projs = projects.filter((_, pIx) => pIx != ix)
        while (projects.length > 0) projects.pop()
        projs.map((p) => projects.push(p))

        updateProjects()
      })
      projHeader.append(projDelete)

      const projBody = new nElement()
      proj.append(projBody)

      projectsEl.append(proj)
    })
  } else {
    const noProjectst = new nElement()
    noProjectst.setText('no projects')
    noProjectst.setStyle('padding', '1em 0em')
    noProjectst.setStyle('text-align', 'center')
    projectsEl.append(noProjectst)
  }
}

updateProjects(projects)
