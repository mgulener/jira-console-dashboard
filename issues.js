class ActiveBoardPoints {
  constructor() {
    this._$issues = document.querySelectorAll('.js-issue');
    this._$issueStatus = document.getElementById('ghx-column-headers')?.querySelectorAll('.ghx-column');
    this.filteredIssues = [];
    this.issueStatus = [];

    this.init();
  }

  init() {
    this.getIssueStatus();
    this.getIssues();
    this.filterIssuesByUser();
  }

  getIssueStatus() {
    this.issueStatus = Array.from(this._$issueStatus).map((status) => {
      return {
        title: status.getAttribute('title'),
        id: status.getAttribute('data-id')
      };
    });
  }

  getIssues() {
    this.filteredIssues = Array.from(this._$issues).map((issue) => {
      const assignee = issue.querySelector('.ghx-avatar-img')?.alt.split(':')[1].trim() || 'Unassigned';
      const story_point = Number(issue.querySelector('aui-badge.ghx-estimate')?.innerText) || 0;
      const updateStatus = () => {
        const _status = issue.closest('.ghx-column')?.getAttribute('data-column-id');
        return this.issueStatus.find((issueStatus) => issueStatus.id === _status).title;
      }

      return {
        assignee,
        story_point,
        status: updateStatus()
      };
    });
  }

  filterIssuesByUser() {
    const _data = []
    this.filteredIssues.forEach(({assignee, story_point, status} = issue) => {
      if (_data[assignee]) {
        if (_data[assignee][status]) {
          _data[assignee][status] += story_point;
        } else {
          _data[assignee][status] = story_point;
        }
        _data[assignee].Toplam += story_point;
      } else {
        _data[assignee] = {
          [status]: story_point,
          Toplam: story_point
        }
      }
    });
    console.clear();
    console.log(_data);
    console.table(_data, ['Toplam']);
    console.table(_data, [this.issueStatus]);
  }
}

const activeBoardPoints = new ActiveBoardPoints();
