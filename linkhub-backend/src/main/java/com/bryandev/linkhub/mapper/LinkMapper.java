package com.bryandev.linkhub.mapper;

import com.bryandev.linkhub.model.dto.response.CreateLinkResponseDto;
import com.bryandev.linkhub.model.dto.response.LinkPublicDto;
import com.bryandev.linkhub.model.dto.response.UpdateLinkResponseDto;
import com.bryandev.linkhub.model.entitIes.LinkEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LinkMapper {

    //@Mapping(target = "id", source = "id")
    //@Mapping(target = "userId", source = "userId")
    @Mapping(target = "iconType", source = "typeIcon")
    CreateLinkResponseDto linkEntityToCreateLinkResponseDto(LinkEntity linkEntity);

    //@Mapping(target = "id", source = "id")
    //@Mapping(target = "userId", source = "userId")
    @Mapping(target = "iconType", source = "typeIcon")
    UpdateLinkResponseDto linkEntityToUpdateLinkResponseDto(LinkEntity linkEntity);

    @Mapping(target = "iconType", source = "typeIcon")
    LinkPublicDto LinkPublicDtoToLinEntity(LinkEntity linkEntity);

    List<LinkPublicDto> ListLinkPublicDtoToListLinkEntity(List<LinkEntity> linkEntityList);
}
