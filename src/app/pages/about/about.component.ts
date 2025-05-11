import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  team = [
    {
      name: '张三',
      role: '创始人 & CEO',
      bio: '拥有10年软件开发经验，专注于Web应用开发。',
      image: 'assets/images/team/ceo.jpg'
    },
    {
      name: '李四',
      role: '技术总监',
      bio: '全栈开发专家，热衷于新技术研究。',
      image: 'assets/images/team/cto.jpg'
    },
    {
      name: '王五',
      role: '产品经理',
      bio: '用户体验专家，致力于创造优秀的产品。',
      image: 'assets/images/team/pm.jpg'
    }
  ];

  milestones = [
    {
      year: '2020',
      title: '项目启动',
      description: '开始构建基础架构和核心功能。'
    },
    {
      year: '2021',
      title: '首次发布',
      description: '推出第一个稳定版本，获得用户好评。'
    },
    {
      year: '2022',
      title: '功能扩展',
      description: '添加更多高级功能和性能优化。'
    },
    {
      year: '2023',
      title: '全球扩张',
      description: '开始服务国际用户，建立全球团队。'
    }
  ];
}
