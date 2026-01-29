import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  page: number;

  @IsOptional()
  @IsIn(['id', 'texto', 'data', 'lido'])
  orderBy: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  orderDirection: 'ASC' | 'DESC';
}
