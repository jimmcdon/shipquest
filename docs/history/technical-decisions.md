# ShipQuest Technical Decisions

## Core Stack Selection

### Development Environment
**Decision**: Cursor + Warp + Claude Code + Docker
**Rationale**: 
- Cursor: AI-native IDE, better than VS Code for AI workflows
- Warp: Modern terminal with blocks, perfect for Claude sessions
- Claude Code: Most powerful AI coding assistant
- Docker: Consistency across environments

**Alternatives Considered**:
- VS Code (traditional, less AI-focused)
- iTerm2 (no AI features)
- GitHub Copilot (less capable than Claude)

### Deployment Platform
**Decision**: Railway over Vercel
**Rationale**:
- Better for full-stack apps
- PostgreSQL included
- Background jobs support
- Preferred personal experience

### Analytics
**Decision**: PostHog over Google Analytics
**Rationale**:
- Privacy-focused
- Developer-friendly
- Feature flags included
- Session recordings

### Database & Auth
**Decision**: Supabase (PostgreSQL + Auth)
**Rationale**:
- Single service for both needs
- Excellent developer experience
- Real-time capabilities
- Cost-effective

### Payment Processing
**Decision**: Stripe primary, Lemon Squeezy alternative
**Rationale**:
- Industry standard
- Best documentation
- Flexible pricing models

## Advanced Strategies Adopted

### From Cole's Guide
1. **Serena MCP Server**
   - Semantic code understanding
   - Superior to native Claude Code
   - Essential for large codebases

2. **PRP Framework (Prompt-Refine-Produce)**
   - More structured than ad-hoc prompting
   - Better than BMAD for code generation
   - Clear three-phase approach

3. **Parallel Agents with Git Worktrees**
   - 4x development speed
   - Multiple solution exploration
   - Risk mitigation

4. **YOLO Mode in Containers**
   - Maximum autonomy
   - Safe in Docker isolation
   - No permission interruptions

5. **Hooks System**
   - Automation layer
   - CI/CD triggers
   - Audit trails

6. **GitHub CLI Integration**
   - Issue to PR automation
   - Complete workflow integration

### From BMAD Methodology
- Spec-driven development
- Document sharding for context
- Role-based agents
- Agile workflow integration

## Architecture Decisions

### Project Structure
```
ShipQuest/
├── docs/           # All documentation
├── app/            # Interactive guide
├── templates/      # Reusable templates
├── examples/       # Example apps (DailyFlow)
└── .claude/        # Claude configuration
```

### Tech Stack for Example App (DailyFlow)
- Frontend: Next.js 14 + TypeScript + Tailwind
- State: Zustand
- UI: Shadcn/ui
- Backend: Next.js API routes
- ORM: Prisma
- Database: PostgreSQL (Supabase)
- Deploy: Railway

## Key Technical Insights

1. **Context Management**: Breaking large specs into sharded documents prevents context overflow

2. **Permission Strategy**: Never auto-approve destructive commands, use YOLO only in containers

3. **Multi-Model Strategy**: 
   - Haiku for simple tasks
   - Sonnet for daily development  
   - Opus for architecture decisions

4. **Development Workflow**: Spec → Setup → Parallel Build → Integrate → Deploy

5. **MCP Servers**: Essential for extending Claude's capabilities beyond basic coding

