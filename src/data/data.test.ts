import { describe, it, expect } from 'vitest';
import { PROJECTS } from './projects';
import { SKILLS } from './skills';
import { EXPERIENCE } from './experience';
import { LAB_EXPERIMENTS } from './labExperiments';
import { ENGINEERING_PRINCIPLES } from './principles';
import { SITE_METADATA } from './metadata';

describe('Data Layer Integrity & Type Validation', () => {
  it('contains valid and complete projects with all required case study fields', () => {
    expect(PROJECTS.length).toBeGreaterThanOrEqual(4);

    PROJECTS.forEach((project) => {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.number).toBeTruthy();
      expect(project.year).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(project.caseStudy).toBeDefined();

      // Verify all required case study sections
      const cs = project.caseStudy;
      expect(cs.role).toBeTruthy();
      expect(cs.overview).toBeTruthy();
      expect(cs.problem).toBeTruthy();
      expect(cs.approach).toBeTruthy();
      expect(cs.system).toBeTruthy();
      expect(cs.architecture).toBeTruthy();
      expect(cs.decisions.length).toBeGreaterThan(0);
      expect(cs.challenges.length).toBeGreaterThan(0);
      expect(cs.outcomes).toBeTruthy();
      expect(cs.learnings).toBeTruthy();
    });
  });

  it('contains valid skills list with non-empty descriptions', () => {
    expect(SKILLS.length).toBeGreaterThan(0);
    SKILLS.forEach((skill) => {
      expect(skill.id).toBeTruthy();
      expect(skill.name).toBeTruthy();
      expect(skill.category).toBeTruthy();
      expect(skill.description).toBeTruthy();
      expect(skill.whyIUseIt).toBeTruthy();
    });
  });

  it('contains authentic experience entries without fabrication', () => {
    expect(EXPERIENCE.length).toBeGreaterThan(0);
    EXPERIENCE.forEach((exp) => {
      expect(exp.id).toBeTruthy();
      expect(exp.role).toBeTruthy();
      expect(exp.organization).toBeTruthy();
      expect(exp.period).toBeTruthy();
      expect(exp.bullets.length).toBeGreaterThan(0);
    });
  });

  it('contains interactive lab experiments', () => {
    expect(LAB_EXPERIMENTS.length).toBeGreaterThan(0);
    LAB_EXPERIMENTS.forEach((exp) => {
      expect(exp.id).toBeTruthy();
      expect(exp.title).toBeTruthy();
      expect(exp.category).toBeTruthy();
      expect(exp.description).toBeTruthy();
    });
  });

  it('contains structured engineering principles', () => {
    expect(ENGINEERING_PRINCIPLES.length).toBe(5);
    ENGINEERING_PRINCIPLES.forEach((principle) => {
      expect(principle.num).toBeTruthy();
      expect(principle.title).toBeTruthy();
      expect(principle.summary).toBeTruthy();
      expect(principle.detail).toBeTruthy();
      expect(principle.flow).toBeTruthy();
    });
  });

  it('contains complete site metadata and valid URLs', () => {
    expect(SITE_METADATA.name).toBe('Ankit Kumar');
    expect(SITE_METADATA.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(SITE_METADATA.github).toContain('github.com');
    expect(SITE_METADATA.linkedin).toContain('linkedin.com');
  });
});
